// Cozy Techo - Core Logic

// --- Global App State ---
const state = {
  selectedDate: getFormattedDate(new Date()), // YYYY-MM-DD
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(), // 0-indexed
  entries: {}, // Database loaded from localStorage
  teaCounter: 0,
  activeStamp: null, // Selected stamp to place
  
  // Audio state
  audioCtx: null,
  isTypewriterEnabled: false,
  isRainPlaying: false,
  rainSource: null,
  rainGain: null,
  typewriterNoiseBuffer: null,
  
  // PWA install prompt
  deferredPrompt: null
};

// --- Helper Functions ---
function getFormattedDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getJapaneseDayName(date) {
  const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  return days[date.getDay()];
}

function formatDateStringJapanese(dateStr) {
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${yyyy}年${mm}月${dd}日`;
}

// --- LocalStorage Database ---
function initDatabase() {
  const storedEntries = localStorage.getItem('cozy_journal_entries');
  if (storedEntries) {
    try {
      state.entries = JSON.parse(storedEntries);
    } catch (e) {
      console.error("Error parsing stored entries", e);
      state.entries = {};
    }
  } else {
    // Scaffold default welcoming entry
    const todayStr = getFormattedDate(new Date());
    state.entries[todayStr] = {
      content: `ようこそ、こつこつ日記へ。
Welcome to your Cozy Techo.

This is a personal, mindful space for your daily reflections.
Everything you write is saved locally on your device and works offline.

✨ Some cozy things to try:
- Click the matcha teacup above to take a sip! Refill it when it is empty.
- Toggle the keyboard sound icon ⌨️ to hear satisfying typewriter clicks as you type.
- Toggle the rain cloud 🌧️ to play a relaxing, synthesized ambient rain track.
- Select a red Hanko stamp from the drawer above, and click anywhere on this gridded paper to place it!
- Use the calendar on the left to review past dates.

Have a peaceful writing session. 🌸`,
      mood: 'matcha',
      stamps: [
        { text: '温', x: 80, y: 70, rotation: -12, isEmoji: false },
        { text: '🌸', x: 15, y: 35, rotation: 8, isEmoji: true }
      ],
      updatedAt: new Date().toISOString()
    };
    saveDatabase();
  }

  const storedTea = localStorage.getItem('cozy_journal_tea_counter');
  state.teaCounter = storedTea ? parseInt(storedTea, 10) : 0;
  updateTeaCounterUI();
}

function saveDatabase() {
  localStorage.setItem('cozy_journal_entries', JSON.stringify(state.entries));
}

// --- Web Audio API Audio Synthesizers ---
function initAudio() {
  if (state.audioCtx) return;
  
  // Initialize audio context
  state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  // 1. Generate typewriter click noise buffer
  const bufferSize = state.audioCtx.sampleRate * 0.04; // 40ms click sound
  const buffer = state.audioCtx.createBuffer(1, bufferSize, state.audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Generate white noise with high-pass fade
    const decay = Math.exp(-i / (bufferSize * 0.25));
    data[i] = (Math.random() * 2 - 1) * decay;
  }
  state.typewriterNoiseBuffer = buffer;
}

// Play satisfy typewriter key click sound
function playTypewriterClick(isEnter = false) {
  initAudio();
  if (!state.audioCtx || !state.isTypewriterEnabled) return;
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }

  if (isEnter) {
    // Carriage Return Bell - synthesised metallic ring (high chime)
    const now = state.audioCtx.currentTime;
    
    // Fundamental frequency chime
    const osc1 = state.audioCtx.createOscillator();
    const osc2 = state.audioCtx.createOscillator();
    const bellGain = state.audioCtx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1600, now); // Principal metallic note
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(3200, now); // First overtone
    
    bellGain.gain.setValueAtTime(0.08, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    
    osc1.connect(bellGain);
    osc2.connect(bellGain);
    bellGain.connect(state.audioCtx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.85);
    osc2.stop(now + 0.85);
    
    // Also trigger a mechanical thud for typewriter return carriage return sound
    playThud();
  } else {
    // Standard key click
    const now = state.audioCtx.currentTime;
    const noiseNode = state.audioCtx.createBufferSource();
    noiseNode.buffer = state.typewriterNoiseBuffer;
    
    // Slight random pitch variation (playback rate) for organic mechanical feel
    noiseNode.playbackRate.setValueAtTime(0.85 + Math.random() * 0.3, now);
    
    const clickFilter = state.audioCtx.createBiquadFilter();
    clickFilter.type = 'bandpass';
    // Vary filter cutoff randomly
    clickFilter.frequency.setValueAtTime(1400 + Math.random() * 600, now);
    clickFilter.Q.setValueAtTime(3, now);
    
    const clickGain = state.audioCtx.createGain();
    clickGain.gain.setValueAtTime(0.12, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    
    noiseNode.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(state.audioCtx.destination);
    
    noiseNode.start(now);
    noiseNode.stop(now + 0.04);
  }
}

function playThud() {
  initAudio();
  if (!state.audioCtx || state.audioCtx.state === 'suspended') return;
  const now = state.audioCtx.currentTime;
  const osc = state.audioCtx.createOscillator();
  const gain = state.audioCtx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
  
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  
  osc.connect(gain);
  gain.connect(state.audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

// Generate continuous ambient rain sound
function startRainSound() {
  initAudio();
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }

  const now = state.audioCtx.currentTime;
  
  // 1. Create a 2-second looping noise buffer
  const bufferSize = state.audioCtx.sampleRate * 2.0;
  const buffer = state.audioCtx.createBuffer(1, bufferSize, state.audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  state.rainSource = state.audioCtx.createBufferSource();
  state.rainSource.buffer = buffer;
  state.rainSource.loop = true;
  
  // 2. Filter: Low-pass filter to sound like soft indoor rain
  const rainFilter = state.audioCtx.createBiquadFilter();
  rainFilter.type = 'lowpass';
  rainFilter.frequency.setValueAtTime(750, now);
  
  // 3. GainNode for volume & fading
  state.rainGain = state.audioCtx.createGain();
  const volumeSlider = document.getElementById('rainVolume');
  const targetVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.3;
  
  state.rainGain.gain.setValueAtTime(0.001, now);
  // Fade in rain sound gently over 1.5 seconds
  state.rainGain.gain.linearRampToValueAtTime(targetVolume, now + 1.5);
  
  state.rainSource.connect(rainFilter);
  rainFilter.connect(state.rainGain);
  state.rainGain.connect(state.audioCtx.destination);
  
  state.rainSource.start(now);
}

function stopRainSound() {
  if (!state.rainSource || !state.audioCtx) return;
  
  const now = state.audioCtx.currentTime;
  // Fade out rain sound gently over 1.0 second
  state.rainGain.gain.cancelScheduledValues(now);
  state.rainGain.gain.setValueAtTime(state.rainGain.gain.value, now);
  state.rainGain.gain.linearRampToValueAtTime(0.001, now + 1.0);
  
  const currentSource = state.rainSource;
  setTimeout(() => {
    try {
      currentSource.stop();
      currentSource.disconnect();
    } catch (e) {
      // Audio already stopped
    }
  }, 1100);
  
  state.rainSource = null;
  state.rainGain = null;
}

// --- Tea Cup Widget Interactions ---
function initTeaWidget() {
  const teaWidget = document.getElementById('teaWidget');
  const liquid = teaWidget.querySelector('.matcha-liquid');
  const steam = teaWidget.querySelector('.tea-steam');
  
  // Initial level setup
  liquid.style.height = '18px'; // Full
  steam.style.display = 'flex'; // Steaming
  
  teaWidget.addEventListener('click', () => {
    const currentHeight = parseInt(liquid.style.height || '18', 10);
    
    if (currentHeight > 0) {
      // Taking a sip!
      const newHeight = Math.max(0, currentHeight - 6);
      liquid.style.height = `${newHeight}px`;
      
      // Sip sound (gentle synthesized organic sound)
      playSipSound();

      if (newHeight === 0) {
        // Empty cup!
        steam.style.display = 'none';
        teaWidget.setAttribute('title', 'Tea is empty! Click to pour a fresh hot matcha.');
      } else {
        // Increment tea cup counter
        state.teaCounter += 1;
        localStorage.setItem('cozy_journal_tea_counter', state.teaCounter);
        updateTeaCounterUI();
      }
    } else {
      // Refilling empty cup!
      liquid.style.height = '18px';
      steam.style.display = 'flex';
      teaWidget.setAttribute('title', 'Click to take a sip of hot matcha!');
      playRefillSound();
    }
  });
}

function updateTeaCounterUI() {
  const label = document.getElementById('teaCounter');
  if (label) {
    label.textContent = `🍵 x${state.teaCounter}`;
  }
}

function playSipSound() {
  initAudio();
  if (!state.audioCtx || state.audioCtx.state === 'suspended') return;
  
  const now = state.audioCtx.currentTime;
  const osc = state.audioCtx.createOscillator();
  const gain = state.audioCtx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
  
  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  
  osc.connect(gain);
  gain.connect(state.audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

function playRefillSound() {
  initAudio();
  if (!state.audioCtx || state.audioCtx.state === 'suspended') return;
  
  const now = state.audioCtx.currentTime;
  // Make a lovely liquid pouring sound (multiple quick bubbly sound envelope)
  const duration = 0.5;
  const bubbles = 8;
  
  for (let i = 0; i < bubbles; i++) {
    const bubbleTime = now + (i * (duration / bubbles));
    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300 + (i * 80) + (Math.random() * 40), bubbleTime);
    osc.frequency.exponentialRampToValueAtTime(800 + (Math.random() * 100), bubbleTime + 0.05);
    
    gain.gain.setValueAtTime(0.02, bubbleTime);
    gain.gain.exponentialRampToValueAtTime(0.001, bubbleTime + 0.06);
    
    osc.connect(gain);
    gain.connect(state.audioCtx.destination);
    
    osc.start(bubbleTime);
    osc.stop(bubbleTime + 0.07);
  }
}

// --- Hanko Stamps Drawer & Overlay ---
function initStamps() {
  const stampItems = document.querySelectorAll('.stamp-item');
  const writingSheet = document.querySelector('.writing-sheet');
  const placedStampsContainer = document.getElementById('placedStampsContainer');
  
  stampItems.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering page select
      
      const stampVal = btn.dataset.stamp;
      
      if (state.activeStamp === stampVal) {
        // Deselect
        state.activeStamp = null;
        btn.classList.remove('active');
        writingSheet.style.cursor = 'default';
      } else {
        // Select stamp
        stampItems.forEach(b => b.classList.remove('active'));
        state.activeStamp = stampVal;
        btn.classList.add('active');
        
        // Change cursor to indicate placement
        writingSheet.style.cursor = 'crosshair';
      }
    });
  });

  // Clicking on writing sheet to place stamp
  writingSheet.addEventListener('click', (e) => {
    if (!state.activeStamp) return;
    
    // Calculate click percentage coordinates relative to sheet
    const rect = writingSheet.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const randomRot = -20 + Math.random() * 40; // -20deg to +20deg
    const isEmoji = ['🌸', '💮'].includes(state.activeStamp);
    
    // Add stamp to model
    if (!state.entries[state.selectedDate]) {
      state.entries[state.selectedDate] = { content: '', mood: '', stamps: [] };
    }
    if (!state.entries[state.selectedDate].stamps) {
      state.entries[state.selectedDate].stamps = [];
    }
    
    const newStamp = {
      text: state.activeStamp,
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      rotation: Math.round(randomRot),
      isEmoji: isEmoji
    };
    
    state.entries[state.selectedDate].stamps.push(newStamp);
    state.entries[state.selectedDate].updatedAt = new Date().toISOString();
    saveDatabase();
    
    // Play satisfying stamp landing sound (soft thud/click)
    playThud();
    
    // Render stamps
    renderPlacedStamps();
    
    // Deselect stamp
    state.activeStamp = null;
    stampItems.forEach(b => b.classList.remove('active'));
    writingSheet.style.cursor = 'default';
    
    // Re-render calendar so it highlights entry if content was empty
    updateCalendarHighlight();
  });
}

function renderPlacedStamps() {
  const container = document.getElementById('placedStampsContainer');
  container.innerHTML = '';
  
  const entry = state.entries[state.selectedDate];
  if (!entry || !entry.stamps) return;
  
  entry.stamps.forEach((stamp, idx) => {
    const stampEl = document.createElement('div');
    stampEl.classList.add('placed-stamp');
    if (stamp.isEmoji) {
      stampEl.classList.add('emoji-stamp');
    }
    
    stampEl.textContent = stamp.text;
    stampEl.style.left = `${stamp.x}%`;
    stampEl.style.top = `${stamp.y}%`;
    stampEl.style.transform = `translate(-50%, -50%) rotate(${stamp.rotation}deg)`;
    stampEl.setAttribute('title', 'Double-click to remove this stamp');
    
    // Allow removing stamp on double click
    stampEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      entry.stamps.splice(idx, 1);
      entry.updatedAt = new Date().toISOString();
      saveDatabase();
      renderPlacedStamps();
      playTypewriterClick(false); // soft click feedback
    });
    
    container.appendChild(stampEl);
  });
}

// --- Calendar Renderer ---
function renderCalendar() {
  const calendarDays = document.getElementById('calendarDays');
  const monthYearLabel = document.getElementById('currentMonthYear');
  
  calendarDays.innerHTML = '';
  
  const firstDayIndex = new Date(state.currentYear, state.currentMonth, 1).getDay();
  const totalDays = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();
  
  // Set month label
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  monthYearLabel.textContent = `${monthNames[state.currentMonth]} ${state.currentYear}`;
  
  // Fill empty days before 1st of month
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('calendar-day', 'empty');
    calendarDays.appendChild(emptyCell);
  }
  
  // Render calendar days
  const todayStr = getFormattedDate(new Date());
  for (let day = 1; day <= totalDays; day++) {
    const dayBtn = document.createElement('div');
    dayBtn.classList.add('calendar-day');
    dayBtn.textContent = day;
    
    const dateStr = `${state.currentYear}-${String(state.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Add custom helper classes
    if (dateStr === todayStr) {
      dayBtn.classList.add('today');
      dayBtn.setAttribute('title', 'Today');
    }
    if (dateStr === state.selectedDate) {
      dayBtn.classList.add('selected');
    }
    if (state.entries[dateStr] && (state.entries[dateStr].content.trim() || (state.entries[dateStr].stamps && state.entries[dateStr].stamps.length > 0))) {
      dayBtn.classList.add('has-entry');
    }
    
    // Day Selection Click handler
    dayBtn.addEventListener('click', () => {
      // Auto-save current before switching
      saveCurrentEntryText();
      
      state.selectedDate = dateStr;
      
      // Update selections in DOM
      document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
      dayBtn.classList.add('selected');
      
      loadEntry(dateStr);
    });
    
    calendarDays.appendChild(dayBtn);
  }
}

function updateCalendarHighlight() {
  renderCalendar();
}

function initCalendarControls() {
  document.getElementById('prevMonth').addEventListener('click', () => {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }
    renderCalendar();
  });
  
  document.getElementById('nextMonth').addEventListener('click', () => {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }
    renderCalendar();
  });
}

// --- Search & Entry List ---
function renderEntriesList(filterQuery = '') {
  const listContainer = document.getElementById('entriesList');
  listContainer.innerHTML = '';
  
  // Sort entries chronologically (reversed)
  const sortedDates = Object.keys(state.entries)
    .filter((date) => {
      const entry = state.entries[date];
      if (!entry.content && (!entry.stamps || entry.stamps.length === 0)) return false;
      if (!filterQuery) return true;
      return entry.content.toLowerCase().includes(filterQuery.toLowerCase());
    })
    .sort((a, b) => b.localeCompare(a));
    
  if (sortedDates.length === 0) {
    listContainer.innerHTML = '<div style="padding: 10px; font-size: 0.8rem; color: var(--ink-muted); text-align: center;">No entries found</div>';
    return;
  }
  
  sortedDates.forEach((dateStr) => {
    const entry = state.entries[dateStr];
    const item = document.createElement('div');
    item.classList.add('entry-list-item');
    if (dateStr === state.selectedDate) {
      item.classList.add('selected');
    }
    
    // Mood emoji mapping
    const moodEmojis = {
      sakura: '🌸',
      matcha: '🍵',
      autumn: '🍂',
      kitsune: '🦊',
      moon: '🌙'
    };
    const moodEmoji = entry.mood ? (moodEmojis[entry.mood] || '') : '';
    
    // Snippet
    const snippet = entry.content ? entry.content.split('\n')[0].substring(0, 18) + (entry.content.length > 18 ? '...' : '') : 'Stamplist...';
    
    item.innerHTML = `
      <span class="entry-item-title">${dateStr}</span>
      <div class="entry-item-meta">
        <span style="font-size: 0.75rem; color: var(--ink-muted); font-family: var(--font-mono);">${snippet}</span>
        <span>${moodEmoji}</span>
      </div>
    `;
    
    item.addEventListener('click', () => {
      saveCurrentEntryText();
      state.selectedDate = dateStr;
      
      // Sync calendar month/year viewport to this date
      const [y, m] = dateStr.split('-');
      state.currentYear = parseInt(y, 10);
      state.currentMonth = parseInt(m, 10) - 1;
      
      renderCalendar();
      loadEntry(dateStr);
    });
    
    listContainer.appendChild(item);
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchEntries');
  searchInput.addEventListener('input', (e) => {
    renderEntriesList(e.target.value);
  });
}

// --- Entry Loader & Saver ---
function loadEntry(dateStr) {
  const entry = state.entries[dateStr] || { content: '', mood: '', stamps: [] };
  
  // Set date elements
  const dateObj = new Date(dateStr + 'T00:00:00'); // Prevent timezone shift
  document.getElementById('selectedDateString').textContent = formatDateStringJapanese(dateStr);
  document.getElementById('selectedDayOfWeek').textContent = getJapaneseDayName(dateObj);
  
  // Set textarea content
  const textarea = document.getElementById('journalContent');
  textarea.value = entry.content;
  
  // Clear any unsaved typing visual state
  document.getElementById('saveStatus').textContent = 'Loaded';
  
  // Set mood selection
  document.querySelectorAll('.mood-btn').forEach((btn) => {
    if (btn.dataset.mood === entry.mood) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Render stamps
  renderPlacedStamps();
  
  // Update selection highlighted in entries log list
  document.querySelectorAll('.entry-list-item').forEach((item) => {
    if (item.querySelector('.entry-item-title').textContent === dateStr) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });

  // Highlight page numbers dynamically based on date logic
  const leftPageNum = document.getElementById('pageNumberLeft');
  const rightPageNum = document.getElementById('pageNumberRight');
  
  // Simple page numbering: Days of year
  const startOfYear = new Date(dateObj.getFullYear(), 0, 1);
  const diffDays = Math.floor((dateObj - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
  leftPageNum.textContent = diffDays * 2 - 1;
  rightPageNum.textContent = diffDays * 2;
}

function saveCurrentEntryText() {
  const textarea = document.getElementById('journalContent');
  const text = textarea.value;
  const activeMoodBtn = document.querySelector('.mood-btn.active');
  const mood = activeMoodBtn ? activeMoodBtn.dataset.mood : '';
  
  const dateStr = state.selectedDate;
  
  // Check if entry contains anything to save
  const existingEntry = state.entries[dateStr];
  const stamps = existingEntry ? (existingEntry.stamps || []) : [];
  
  if (text.trim() === '' && stamps.length === 0 && mood === '') {
    // Delete entry if emptied completely to save storage
    if (state.entries[dateStr]) {
      delete state.entries[dateStr];
      saveDatabase();
      updateStats();
      updateCalendarHighlight();
      renderEntriesList();
    }
    return;
  }
  
  state.entries[dateStr] = {
    content: text,
    mood: mood,
    stamps: stamps,
    updatedAt: new Date().toISOString()
  };
  
  saveDatabase();
  updateStats();
  updateCalendarHighlight();
  renderEntriesList();
}

// Auto-save debouncing
let saveTimeout = null;
function setupAutosave() {
  const textarea = document.getElementById('journalContent');
  const saveStatus = document.getElementById('saveStatus');
  
  textarea.addEventListener('input', (e) => {
    // 1. Play satisfaction click sounds
    const textVal = e.target.value;
    const isEnter = e.inputType === 'insertLineBreak' || (e.data === null && textVal.charAt(textarea.selectionStart - 1) === '\n');
    playTypewriterClick(isEnter);
    
    // 2. Debounce database auto-saving
    saveStatus.textContent = 'Writing...';
    
    if (saveTimeout) clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(() => {
      saveCurrentEntryText();
      saveStatus.textContent = 'Saved automatically';
    }, 800); // Save after 800ms of inactivity
  });
}

function initMoodSelector() {
  const moodButtons = document.querySelectorAll('.mood-btn');
  moodButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      initAudio();
      
      const isSelected = btn.classList.contains('active');
      moodButtons.forEach(b => b.classList.remove('active'));
      
      if (!isSelected) {
        btn.classList.add('active');
        playThud(); // woody physical click sound
      } else {
        playTypewriterClick(false); // standard typewriter tap
      }
      
      // Auto save
      saveCurrentEntryText();
    });
  });
}

function initActionButtons() {
  // Save Button (Force Save)
  document.getElementById('saveEntryBtn').addEventListener('click', () => {
    saveCurrentEntryText();
    const saveStatus = document.getElementById('saveStatus');
    saveStatus.textContent = 'Saved successfully!';
    setTimeout(() => {
      saveStatus.textContent = 'Saved automatically';
    }, 2000);
    playThud();
  });
  
  // Delete Button
  document.getElementById('deleteEntryBtn').addEventListener('click', () => {
    const confirmation = confirm(`Are you sure you want to delete the entry for ${state.selectedDate}?`);
    if (!confirmation) return;
    
    if (state.entries[state.selectedDate]) {
      delete state.entries[state.selectedDate];
      saveDatabase();
      updateStats();
      updateCalendarHighlight();
      renderEntriesList();
    }
    
    // Reload date
    loadEntry(state.selectedDate);
    playThud();
  });
}

// --- App Stats Calculation ---
function updateStats() {
  const dates = Object.keys(state.entries).filter(d => {
    const e = state.entries[d];
    return e.content.trim() !== '' || (e.stamps && e.stamps.length > 0);
  });
  
  // 1. Total entries count
  const totalEntriesVal = document.getElementById('totalEntriesVal');
  totalEntriesVal.textContent = dates.length;
  
  // 2. Continuous writing streak
  const streakVal = document.getElementById('streakVal');
  streakVal.textContent = calculateStreak(dates);
}

function calculateStreak(dates) {
  if (dates.length === 0) return 0;
  
  // Sort dates ascending
  const sortedDates = [...dates].sort((a, b) => a.localeCompare(b));
  
  let currentStreak = 0;
  let maxStreak = 0;
  let prevDate = null;
  
  const todayStr = getFormattedDate(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getFormattedDate(yesterday);
  
  // Check if writing includes today or yesterday
  const hasWritingRecent = dates.includes(todayStr) || dates.includes(yesterdayStr);
  if (!hasWritingRecent) return 0;

  let streak = 0;
  let testDate = new Date(); // Start tracing backwards from today/yesterday
  
  // If no entry today, check yesterday. If yesterday also doesn't have, streak is 0.
  let checkStr = getFormattedDate(testDate);
  if (!dates.includes(checkStr)) {
    testDate.setDate(testDate.getDate() - 1);
    checkStr = getFormattedDate(testDate);
  }
  
  while (dates.includes(checkStr)) {
    streak++;
    testDate.setDate(testDate.getDate() - 1);
    checkStr = getFormattedDate(testDate);
  }
  
  return streak;
}

// --- Import / Export Backup ---
function initBackupSystem() {
  // Export JSON
  document.getElementById('exportBtn').addEventListener('click', () => {
    const dataStr = JSON.stringify({
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      entries: state.entries,
      teaCounter: state.teaCounter
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cozy_techo_backup_${getFormattedDate(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    playThud();
  });
  
  // Import JSON
  const fileInput = document.getElementById('importFile');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const importedData = JSON.parse(evt.target.result);
        if (importedData && importedData.entries) {
          // Merge imported entries with local ones
          state.entries = { ...state.entries, ...importedData.entries };
          saveDatabase();
          
          if (importedData.teaCounter !== undefined) {
            state.teaCounter = Math.max(state.teaCounter, parseInt(importedData.teaCounter, 10));
            localStorage.setItem('cozy_journal_tea_counter', state.teaCounter);
            updateTeaCounterUI();
          }
          
          // Re-render UI
          initDatabase();
          renderCalendar();
          renderEntriesList();
          loadEntry(state.selectedDate);
          updateStats();
          
          alert('Log entries imported successfully!');
          playThud();
        } else {
          alert('Invalid backup file structure.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    // Clear file selection
    fileInput.value = '';
  });
}

// --- Sound Toggle Listeners ---
function initSoundControls() {
  const typewriterBtn = document.getElementById('typewriterToggle');
  const rainBtn = document.getElementById('rainToggle');
  const rainVolume = document.getElementById('rainVolume');
  
  // Typewriter audio Toggle
  typewriterBtn.addEventListener('click', () => {
    initAudio();
    state.isTypewriterEnabled = !state.isTypewriterEnabled;
    
    if (state.isTypewriterEnabled) {
      typewriterBtn.classList.remove('muted');
      typewriterBtn.setAttribute('title', 'Mute Keyboard Clicks');
      playTypewriterClick(false);
    } else {
      typewriterBtn.classList.add('muted');
      typewriterBtn.setAttribute('title', 'Enable Keyboard Clicks');
    }
  });
  
  // Ambient Rain Toggle
  rainBtn.addEventListener('click', () => {
    initAudio();
    state.isRainPlaying = !state.isRainPlaying;
    
    if (state.isRainPlaying) {
      rainBtn.classList.remove('muted');
      rainBtn.setAttribute('title', 'Mute Ambient Rain');
      startRainSound();
    } else {
      rainBtn.classList.add('muted');
      rainBtn.setAttribute('title', 'Enable Ambient Rain');
      stopRainSound();
    }
  });
  
  // Rain Volume slider change
  rainVolume.addEventListener('input', (e) => {
    const volume = parseFloat(e.target.value);
    if (state.rainGain && state.audioCtx) {
      state.rainGain.gain.setValueAtTime(volume, state.audioCtx.currentTime);
    }
  });
}

// --- Offline & Service Worker Management ---
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('ServiceWorker registered with scope: ', reg.scope);
        })
        .catch((err) => {
          console.error('ServiceWorker registration failed: ', err);
        });
    });
  }

  // Monitor network connection status
  const indicator = document.getElementById('offlineIndicator');
  const text = indicator.querySelector('.indicator-text');
  
  function updateOnlineStatus() {
    if (navigator.onLine) {
      indicator.className = 'offline-indicator online';
      indicator.setAttribute('title', 'Status: Online');
      text.textContent = 'Online';
    } else {
      indicator.className = 'offline-indicator offline';
      indicator.setAttribute('title', 'Status: Offline (Offline mode active)');
      text.textContent = 'Offline';
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  // initial status check
  updateOnlineStatus();
}

function handlePWAInstallation() {
  const installBanner = document.getElementById('installBanner');
  const acceptBtn = document.getElementById('acceptInstallBtn');
  const declineBtn = document.getElementById('declineInstallBtn');
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    state.deferredPrompt = e;
    // Show the custom cozy installation banner
    installBanner.classList.remove('hidden');
  });

  acceptBtn.addEventListener('click', () => {
    if (!state.deferredPrompt) return;
    // Show the browser install prompt
    state.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    state.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      state.deferredPrompt = null;
      installBanner.classList.add('hidden');
    });
  });

  declineBtn.addEventListener('click', () => {
    installBanner.classList.add('hidden');
  });
}

// --- App Initialization Entry Point ---
document.addEventListener('DOMContentLoaded', () => {
  // Load databases
  initDatabase();
  
  // Render Left Page
  renderCalendar();
  initCalendarControls();
  renderEntriesList();
  initSearch();
  updateStats();
  
  // Load initial today's date in Right Page Editor
  loadEntry(state.selectedDate);
  
  // Initialize Widgets and Interactive Elements
  initTeaWidget();
  initStamps();
  initMoodSelector();
  initSoundControls();
  initActionButtons();
  setupAutosave();
  initBackupSystem();
  
  // Service Worker and Install Promotions
  registerServiceWorker();
  handlePWAInstallation();
});

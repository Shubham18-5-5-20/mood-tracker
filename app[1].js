document.addEventListener('DOMContentLoaded', () => {
    function getMoodEntries() {
        const entries = localStorage.getItem('moodEntries');
        return entries ? JSON.parse(entries) : {};
    }

    function saveMoodEntries(entries) {
        localStorage.setItem('moodEntries', JSON.stringify(entries));
    }

    // --- LOGIC FOR INDEX.HTML (Entry Page) ---
    if (document.querySelector('.hero-section')) {
        const emojiBtn = document.getElementById('emojiBtn');
        const emojiPopover = document.getElementById('emojiPopover');
        const saveBtn = document.getElementById('saveBtn');
        const moodNoteInput = document.getElementById('moodNote');
        let selectedEmoji = null;

        emojiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            emojiPopover.style.display = 'block';
        });

        document.addEventListener('click', () => {
            emojiPopover.style.display = 'none';
        });

        emojiPopover.querySelectorAll('.emoji-option').forEach(button => {
            button.addEventListener('click', () => {
                selectedEmoji = button.dataset.emoji;
                emojiBtn.innerHTML = `<span style='font-size:38px;'>${selectedEmoji}</span>`;
            });
        });

        saveBtn.addEventListener('click', () => {
            const noteText = moodNoteInput.value.trim();
            const today = new Date();
            const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            if (!selectedEmoji) {
                alert('Please select a mood!');
                return;
            }

            const entries = getMoodEntries();
            entries[dateKey] = { emoji: selectedEmoji, note: noteText };
            saveMoodEntries(entries);

            alert('Mood saved!');
            moodNoteInput.value = '';
            selectedEmoji = null;
            emojiBtn.innerHTML = `<i class='fas fa-theater-masks' style='font-size:38px;color:rgb(11, 15, 227)'></i>`;
        });
    }

    // --- LOGIC FOR CALENDAR.HTML ---
    if (document.querySelector('.calendar.bg-white')) {
        const calendarDaysEl = document.getElementById("calendarDays");
        const monthYearEl = document.getElementById("monthYear");
        const prevBtn = document.getElementById("prev");
        const nextBtn = document.getElementById("next");
        const entryModal = document.getElementById('entryModal'),
              entryModalDateEl = document.getElementById('entryModalDate'),
              entryModalEmojiBtn = document.getElementById('entryModalEmojiBtn'),
              entryModalNoteEl = document.getElementById('entryModalNote'),
              editEmojiPicker = document.getElementById('editEmojiPicker'),
              saveEntryChangesBtn = document.getElementById('saveEntryChanges'),
              deleteEntryBtn = document.getElementById('deleteEntry'),
              closeEntryModalBtn = document.getElementById('closeEntryModal');
        
        let currentlyEditingDate = null, today = new Date(), currentMonth = today.getMonth(), currentYear = today.getFullYear();

        function renderCalendar(month, year) {
            calendarDaysEl.innerHTML = '';
            const entries = getMoodEntries();
            monthYearEl.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
            const firstDayOfMonth = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDayOfMonth; i++) calendarDaysEl.innerHTML += '<div></div>';

            for (let day = 1; day <= daysInMonth; day++) {
                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const entry = entries[dateKey];
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                
                const dayDiv = document.createElement('div');
                dayDiv.className = `cursor-pointer rounded-full py-2 h-12 flex items-center justify-center`;
                
                if (isToday && !entry) dayDiv.classList.add('bg-blue-500', 'text-white', 'font-bold');

                if (entry) {
                    dayDiv.textContent = entry.emoji;
                    dayDiv.classList.add('text-3xl', 'hover:bg-gray-200');
                    dayDiv.addEventListener('click', () => openEntryModal(dateKey));
                } else {
                    dayDiv.textContent = day;
                }
                calendarDaysEl.appendChild(dayDiv);
            }
        }
        
        function openEntryModal(dateKey) {
            const entry = getMoodEntries()[dateKey];
            if (!entry) return;
            
            currentlyEditingDate = dateKey;
            entryModalDateEl.textContent = new Date(dateKey + 'T00:00:00').toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"});
            entryModalEmojiBtn.textContent = entry.emoji;
            entryModalNoteEl.value = entry.note;
            entryModal.style.display = 'flex';
        }

        function closeEntryModal() {
            entryModal.style.display = 'none';
            editEmojiPicker.style.display = 'none';
        }

        entryModalEmojiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editEmojiPicker.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
             if (entryModal.style.display === 'flex' && !editEmojiPicker.contains(e.target) && !entryModalEmojiBtn.contains(e.target)) {
                editEmojiPicker.style.display = 'none';
            }
        });

        editEmojiPicker.querySelectorAll('.emoji-option').forEach(button => {
            button.addEventListener('click', () => {
                entryModalEmojiBtn.textContent = button.dataset.emoji;
                editEmojiPicker.style.display = 'none';
            });
        });
        
        closeEntryModalBtn.addEventListener('click', closeEntryModal);
        saveEntryChangesBtn.addEventListener('click', () => {
            const entries = getMoodEntries();
            entries[currentlyEditingDate] = { emoji: entryModalEmojiBtn.textContent, note: entryModalNoteEl.value.trim() };
            saveMoodEntries(entries);
            closeEntryModal();
            renderCalendar(currentMonth, currentYear);
        });

        deleteEntryBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this entry?')) {
                const entries = getMoodEntries();
                delete entries[currentlyEditingDate];
                saveMoodEntries(entries);
                closeEntryModal();
                renderCalendar(currentMonth, currentYear);
            }
        });

        prevBtn.addEventListener('click', () => { currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } renderCalendar(currentMonth, currentYear); });
        nextBtn.addEventListener('click', () => { currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } renderCalendar(currentMonth, currentYear); });

        renderCalendar(currentMonth, currentYear);
    }
});

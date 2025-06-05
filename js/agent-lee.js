/**
 * Agent Lee - Interactive assistant for Always Trucking & Loading LLC
 * Provides engaging information about trucking services and training
 */

// --- Global Voice Readiness Promise ---
let voicesReadyPromise = null;
function getVoicesReadyPromise() {
    if (!voicesReadyPromise) {
        voicesReadyPromise = new Promise((resolve, reject) => {
            try {
                if (typeof speechSynthesis === 'undefined') {
                    console.warn("SpeechSynthesis API is not available.");
                    return reject("SpeechSynthesis API not available");
                }
                if (speechSynthesis.getVoices().length > 0) {
                    resolve(speechSynthesis.getVoices());
                    return;
                }
                speechSynthesis.onvoiceschanged = () => {
                    if (speechSynthesis.getVoices().length > 0) {
                        resolve(speechSynthesis.getVoices());
                    } else {
                        console.warn("onvoiceschanged fired, but getVoices() is still empty. Waiting for next potential fire or manual trigger.");
                    }
                };
                 // Attempt to trigger loading if voices are not immediately available
                if (speechSynthesis.getVoices().length === 0) {
                    // A benign call to getVoices() can sometimes prompt loading in certain browsers.
                    speechSynthesis.getVoices();
                }
            } catch (error) {
                console.error("Error initializing voicesReadyPromise:", error);
                reject(error);
            }
        });
    }
    return voicesReadyPromise;
}
// --- End Global Voice Readiness ---

class AgentLee {
    constructor() {
        this.name = "Lee";
        this.role = "Always Trucking Assistant";
        this.isActive = false; // Is the UI card currently shown and active?
        this.isSpeaking = false;
        this.avatarImage = "lmlz7zis45.png"; // Ensure this path is correct
        this.selectedLanguage = 'en-US';
        this.selectedVoice = null;
        this.availableLanguages = new Map();
        this.userHasInteracted = false;

        this.messages = {
            'en-US': {
                greetings: [
                    "Hello, I’m Agent Lee, your assistant here at Always Trucking & Loading. Press the button to get started!"
                ]
            }
        };

        this.faqTopics = this.getCurrentFAQTopics();
    }

    initialize() {
        this.initializeGlobalVoiceSelectors();
        if (!document.getElementById('agent-lee')) {
            this.createAgentElement(); // This now calls updateFAQButtons
            this.addEventListeners();
        }
    }

    createAgentElement() {
        const agentContainer = document.createElement('div');
        agentContainer.id = 'agent-lee';
        agentContainer.className = 'agent-lee agent-lee-hidden'; // Start hidden
        agentContainer.innerHTML = `
            <div class="agent-card">
                <div class="agent-header">
                    <div class="agent-avatar"><img src="${this.avatarImage}" alt="Agent Lee"></div>
                    <div class="agent-info"><h3>Agent Lee</h3><p>Always Trucking Assistant</p></div>
                    <button class="minimize-agent" title="Minimize" aria-label="Minimize">
                        <svg width="32" height="32" viewBox="0 0 32 32" style="display:block;" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="22" width="16" height="3" rx="1.5" fill="#d7c9a1"/></svg>
                    </button>
                </div>
                <div class="agent-body">
                    <div class="speech-bubble"><p id="agent-speech"></p><div class="typing-indicator"><span></span><span></span><span></span></div></div>
                    <div class="agent-controls">
                        <button class="control-button stop-speaking" title="Stop Speaking"><i class="fas fa-volume-mute"></i></button>
                        <button class="control-button speak-again" title="Speak Again"><i class="fas fa-volume-up"></i></button>
                    </div>
                    <div class="common-questions"><h4>Ask about:</h4><div class="question-buttons"></div></div>
                </div>
                <div class="agent-footer">
                    <div class="action-links">
                        <a href="tel:4142399333" class="action-link phone-link"><i class="fas fa-phone"></i> (414) 239-9333</a>
                        <a href="tel:4149827034" class="action-link phone-link"><i class="fas fa-phone"></i> (414) 982-7034</a>
                        <a href="mailto:Anthony@alwaystruckingandloading.com" class="action-link email-link"><i class="fas fa-envelope"></i> Email Us</a>
                        <a href="http://alwaystruckingandloading.com" target="_blank" class="action-link website-link"><i class="fas fa-globe"></i> Website</a>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(agentContainer);
        this.updateFAQButtons(); // Populate FAQ buttons after card is in DOM
    }
    
    updateFAQButtons() {
        const agentCard = document.getElementById('agent-lee');
        if (!agentCard) { console.warn("updateFAQButtons: agent-lee card not found."); return; }
        const topicContainer = agentCard.querySelector('.question-buttons');
        if (!topicContainer) { console.warn("updateFAQButtons: .question-buttons container not found."); return; }

        topicContainer.innerHTML = ''; // Clear existing buttons
        this.faqTopics = this.getCurrentFAQTopics(); 

        this.faqTopics.forEach((topic, index) => {
            const button = document.createElement('button');
            button.className = 'question-button';
            button.textContent = topic.question;
            button.dataset.topicIndex = index.toString();
            topicContainer.appendChild(button);
        });
    }

    addEventListeners() {
        const agentCard = document.getElementById('agent-lee');
        if (!agentCard) return;

        const minimizeBtn = agentCard.querySelector('.minimize-agent');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                if (window.hideAgentLeeCard) window.hideAgentLeeCard();
            });
        }

        const questionButtonsContainer = agentCard.querySelector('.question-buttons');
        if (questionButtonsContainer) {
            questionButtonsContainer.addEventListener('click', (event) => {
                const button = event.target.closest('.question-button');
                if (button) {
                    const topicIndex = parseInt(button.dataset.topicIndex, 10);
                    if (this.faqTopics[topicIndex]) {
                        const topic = this.faqTopics[topicIndex];
                        this.speak(`${topic.answer} ${topic.cta}`);
                        agentCard.querySelectorAll('.question-button').forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    }
                }
            });
        }

        const stopSpeakingBtn = agentCard.querySelector('.stop-speaking');
        if (stopSpeakingBtn) stopSpeakingBtn.addEventListener('click', () => this.stopSpeaking());

        const speakAgainBtn = agentCard.querySelector('.speak-again');
        if (speakAgainBtn) {
            speakAgainBtn.addEventListener('click', () => {
                const speechP = document.getElementById('agent-speech');
                const speechText = speechP ? speechP.textContent : "";
                if (speechText) this.speak(speechText, true);
                else this.speak(this.getRandomItem(this.getCurrentMessages().greetings));
            });
        }
    }

    speak(message, skipTyping = false) {
        this.stopSpeaking(); // Stop any current speech/typing
        
        const speechElement = document.getElementById('agent-speech');
        const typingIndicator = document.querySelector('#agent-lee .typing-indicator');
        if (!speechElement || !typingIndicator) {
            console.error("Speech elements not found in speak().");
            return;
        }

        this.isSpeaking = true; // Indicate that an attempt to speak/type is starting

        if (skipTyping) {
            speechElement.textContent = message;
            typingIndicator.style.display = 'none';
            this.speakAudio(message);
        } else {
            speechElement.textContent = ''; // Clear previous text
            typingIndicator.style.display = 'flex';
            let i = 0;
            const typeSpeed = 18; 
            
            // Store timeout ID to clear it if stopSpeaking is called
            if (this.typingTimeoutId) clearTimeout(this.typingTimeoutId);

            const typeNext = () => {
                if (i < message.length) {
                    speechElement.textContent += message.charAt(i);
                    i++;
                    this.typingTimeoutId = setTimeout(typeNext, typeSpeed);
                } else {
                    typingIndicator.style.display = 'none';
                    this.speakAudio(message); // speakAudio will set isSpeaking false on end/error
                    this.typingTimeoutId = null;
                }
            };
            typeNext();
        }
    }
    
    speakAudio(message) {
        if (typeof speechSynthesis === 'undefined' || !('speak' in speechSynthesis)) {
            console.warn("Speech synthesis not supported or not fully available.");
            this.isSpeaking = false; // Cannot speak
            return;
        }

        // Cancel any utterance that might be queued or playing from this agent
        window.speechSynthesis.cancel(); 

        const speech = new SpeechSynthesisUtterance(message);
        speech.rate = 1; speech.pitch = 1; speech.volume = 1;
        
        let voiceToUse = this.selectedVoice;
        if (!voiceToUse) {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) { // Only try to select if voices are available
               voiceToUse = this.selectVoice(voices);
            }
        }

        if (voiceToUse) {
            speech.voice = voiceToUse;
            speech.lang = voiceToUse.lang;
        } else {
            speech.lang = this.selectedLanguage || 'en-US'; // Fallback language
        }
        
        speech.onstart = () => {
            // this.isSpeaking is already true from speak() method.
            // console.log("Speech started:", message.substring(0,30));
        };
        speech.onend = () => {
            this.isSpeaking = false;
            // console.log("Speech ended.");
        };
        speech.onerror = (event) => {
            console.error("SpeechSynthesisUtterance error:", event.error, "for message:", message.substring(0,50));
            this.isSpeaking = false;
        };

        try {
            window.speechSynthesis.speak(speech);
        } catch (e) {
            console.error("Error calling speechSynthesis.speak():", e);
            this.isSpeaking = false;
        }
    }

    stopSpeaking() {
        if (this.typingTimeoutId) {
            clearTimeout(this.typingTimeoutId);
            this.typingTimeoutId = null;
        }
        if (typeof speechSynthesis !== 'undefined' && 'cancel' in speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        this.isSpeaking = false;
        const typingIndicator = document.querySelector('#agent-lee .typing-indicator');
        if (typingIndicator) typingIndicator.style.display = 'none';
        const speechElement = document.getElementById('agent-speech');
        // Optional: clear current text or leave it as is when stopped
        // if (speechElement) speechElement.textContent = ""; 
    }

    selectVoice(voices) {
        if (!voices || voices.length === 0) return null;
        const langToMatch = this.selectedLanguage || 'en';
        const langSpecificVoices = voices.filter(voice => voice.lang.startsWith(langToMatch.split('-')[0]));
        const voicesToSearch = langSpecificVoices.length > 0 ? langSpecificVoices : voices;
        const preferredMaleVoices = ['Microsoft David Desktop', 'Microsoft David', 'David', 'Google US English Male', 'Alex', 'Daniel', 'Mark', 'Aaron'];
        for (const preferred of preferredMaleVoices) {
            const match = voicesToSearch.find(voice => voice.name.includes(preferred) && voice.lang.startsWith(langToMatch.split('-')[0]));
            if (match) return match;
        }
        const maleVoices = this.filterMaleVoices(voicesToSearch.filter(v => v.lang.startsWith(langToMatch.split('-')[0])));
        if (maleVoices.length > 0) return maleVoices[0];
        if (langSpecificVoices.length > 0) return langSpecificVoices[0];
        if (!langToMatch.startsWith('en')) {
            const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
            if (englishVoice) return englishVoice;
        }
        return voices[0] || null; // Return null if voices array was empty after all
    }

    getRandomItem(array) { return array[Math.floor(Math.random() * array.length)]; }
    getCurrentMessages() { return this.messages['en-US']; }
    
    getCurrentFAQTopics() {
        return [
            { question: "What CDL training programs do you offer?", answer: "We offer comprehensive CDL Class A and B training programs, refresher courses, and specialized endorsement training for hazardous materials, tankers, and passenger vehicles.", cta: "Visit our website for more details!" },
            { question: "How long does CDL training take?", answer: "Our full CDL training typically takes 3-6 weeks, depending on the program and your schedule. We offer both full-time and part-time options to accommodate your needs.", cta: "Ready to start your training journey?" },
            { question: "What are the costs for CDL training?", answer: "Our training programs are competitively priced with flexible payment options. We offer financing for qualified students and special rates for veterans.", cta: "Contact us for pricing details!" },
            { question: "Do you help with job placement?", answer: "Absolutely! We have strong relationships with trucking companies across the region and provide job placement assistance to help you start your new career.", cta: "Start your new career today!" },
            { question: "Who is the instructor?", answer: "Our lead instructor is Anthony, who brings over 15 years of industry experience to the classroom. He's a certified instructor passionate about training professional drivers.", cta: "Learn from the best in the industry!" }
        ];
    }

    initializeGlobalVoiceSelectors() {
        const langSelect = document.getElementById('lang-select');
        const voiceSelect = document.getElementById('voice-select');
        if (!langSelect || !voiceSelect) {
            console.warn("Language or voice select dropdown not found.");
            return;
        }
        const setup = (voices) => {
            if (!voices || voices.length === 0) {
                console.warn("setup() called but no voices provided for instance:", this.name);
                return;
            }
            this.populateLanguageSelector(langSelect, voices); // Populates this.availableLanguages
            this.populateVoiceSelector(voiceSelect, this.selectedLanguage); // Uses this.availableLanguages
            this.addGlobalSelectorListeners(langSelect, voiceSelect);
            this.loadVoicePreferences(langSelect, voiceSelect, voices);
        };
        getVoicesReadyPromise()
            .then(setup)
            .catch(error => {
                console.error("Failed to get voices for instance:", this.name, error);
            });
    }

    populateLanguageSelector(langSelect, voices) {
        this.availableLanguages.clear();
        voices.forEach(voice => {
            const lang = voice.lang; const langName = this.getLanguageName(lang);
            if (!this.availableLanguages.has(lang)) this.availableLanguages.set(lang, { name: langName, voices: [] });
            this.availableLanguages.get(lang).voices.push(voice);
        });
        if (!langSelect) return; // Allow calling without a langSelect element for internal use
        langSelect.innerHTML = '<option value="">Select Language</option>';
        const sortedLangs = Array.from(this.availableLanguages.keys()).sort((a, b) => {
            if (a.startsWith('en-')) return -1; if (b.startsWith('en-')) return 1;
            return (this.availableLanguages.get(a)?.name || a).localeCompare(this.availableLanguages.get(b)?.name || b);
        });
        sortedLangs.forEach(lang => {
            const option = document.createElement('option'); option.value = lang;
            option.textContent = this.availableLanguages.get(lang)?.name || lang; langSelect.appendChild(option);
        });
    }

    populateVoiceSelector(voiceSelect, selectedLang = this.selectedLanguage) {
        if (!voiceSelect) return; // Allow calling without a voiceSelect element
        voiceSelect.innerHTML = '<option value="">Select Voice</option>';
        
        let langData = this.availableLanguages.get(selectedLang);
        if (!langData) { 
            const baseLang = selectedLang.split('-')[0];
            const baseLangKey = Array.from(this.availableLanguages.keys()).find(k => k.startsWith(baseLang));
            if (baseLangKey) langData = this.availableLanguages.get(baseLangKey);
            else { console.warn(`No language data for ${selectedLang} in populateVoiceSelector`); return; }
        }
        if (!langData || !langData.voices) { console.warn(`No voices in langData for ${selectedLang}`); return;}

        let filteredVoices = langData.voices; 
        if (selectedLang.startsWith('en-')) {
            filteredVoices = this.filterMaleVoices(langData.voices);
        } else {
            const maleVoices = this.filterMaleVoices(langData.voices);
            const femaleVoices = langData.voices.filter(voice => !maleVoices.includes(voice));
            filteredVoices = [...maleVoices, ...femaleVoices];
        }
        filteredVoices.forEach(voice => {
            const option = document.createElement('option'); option.value = voice.name;
            option.textContent = this.getVoiceDisplayName(voice); voiceSelect.appendChild(option);
        });
    }

    filterMaleVoices(voices) {
        const maleKeywords = ['male', 'man', 'david', 'mark', 'alex', 'daniel', 'james', 'thomas', 'aaron', 'arthur'];
        const femaleKeywords = ['female', 'woman', 'zira', 'cortana', 'samantha', 'susan', 'karen', 'hazel', 'eva', 'lucy', 'mia', 'sonia'];
        const qualityProviders = ['Microsoft', 'Google', 'Apple', 'Amazon'];
        const maleVoices = voices.filter(voice => {
            const nameLower = voice.name.toLowerCase();
            const isLikelyMale = maleKeywords.some(keyword => nameLower.includes(keyword));
            const isLikelyFemale = femaleKeywords.some(keyword => nameLower.includes(keyword));
            if (isLikelyFemale) return false;
            if (isLikelyMale) return true;
            return !nameLower.includes('female') && !nameLower.includes('woman');
        });
        return maleVoices.sort((a, b) => {
            const aQuality = qualityProviders.some(provider => a.name.includes(provider)) ? 1 : 0;
            const bQuality = qualityProviders.some(provider => b.name.includes(provider)) ? 1 : 0;
            if (bQuality !== aQuality) return bQuality - aQuality;
            if (a.name.includes('Desktop') || a.name.includes('Online')) return -1;
            if (b.name.includes('Desktop') || b.name.includes('Online')) return 1;
            return 0;
        });
    }

    getVoiceDisplayName(voice) {
        let displayName = voice.name;
        displayName = displayName.replace(/ - \w+$/, '').replace(/ Desktop$/, '').replace(/ \(Enhanced\)$/, '').replace(/\(Natural\)$/, '').trim();
        displayName = displayName.replace(/Microsoft (Server Speech Text to Speech Voice) \(\w+, (\w+)\)/, '$2 (Microsoft Server)');
        displayName = displayName.replace(/Google \w+-\w+ /, ''); return displayName;
    }

    getLanguageName(langCode) {
        try {
            if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames !== 'undefined') {
                const displayName = new Intl.DisplayNames([langCode.split('-')[0]], { type: 'language' });
                return displayName.of(langCode.split('-')[0]);
            }
        } catch (e) { /* Fallback below */ }
        const languageNames = {'en-US':'English (US)','en-GB':'English (UK)','es-ES':'Spanish (Spain)','fr-FR':'French (France)','de-DE':'German','it-IT':'Italian','zh-CN':'Chinese (Simplified)','ja-JP':'Japanese'};
        return languageNames[langCode] || langCode;
    }

    addGlobalSelectorListeners(langSelect, voiceSelect) {
        langSelect.addEventListener('change', () => {
            this.selectedLanguage = langSelect.value || 'en-US';
            this.faqTopics = this.getCurrentFAQTopics(); 
            if (window.agentLee && window.agentLee.isActive) { 
                window.agentLee.updateFAQButtons();
            }
            this.populateVoiceSelector(voiceSelect, this.selectedLanguage);
            this.markUserInteracted();
            voiceSelect.value = ''; this.selectedVoice = null; this.saveVoicePreferences();
        });
        voiceSelect.addEventListener('change', () => {
            const selectedVoiceName = voiceSelect.value;
            if (selectedVoiceName) {
                const voices = speechSynthesis.getVoices(); // Get fresh voices list
                this.selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
                if (this.selectedVoice) {
                    this.markUserInteracted(); this.saveVoicePreferences();
                    const testMessage = (this.getCurrentMessages().greetings[0] || "Voice selected.").substring(0, 100) + "...";
                    this.speak(testMessage, true);
                }
            } else {
                this.selectedVoice = null; this.saveVoicePreferences();
            }
        });
    }

    markUserInteracted() {
        this.userHasInteracted = true; const selectors = document.querySelector('.lang-voice-selectors');
        if (selectors) selectors.classList.add('user-interacted');
    }

    saveVoicePreferences() {
        localStorage.setItem('agentlee-language', this.selectedLanguage);
        if (this.selectedVoice) localStorage.setItem('agentlee-voice', this.selectedVoice.name);
        else localStorage.removeItem('agentlee-voice');
        localStorage.setItem('agentlee-voice-selected', this.userHasInteracted.toString());
    }

    loadVoicePreferences(langSelect, voiceSelect, availableVoices) {
        const savedLang = localStorage.getItem('agentlee-language');
        const savedVoiceName = localStorage.getItem('agentlee-voice');
        const userInteracted = localStorage.getItem('agentlee-voice-selected') === 'true';

        this.selectedLanguage = savedLang || 'en-US';
        if(langSelect) langSelect.value = this.selectedLanguage;
        
        const voices = availableVoices || speechSynthesis.getVoices();

        if (this.availableLanguages.size === 0 && voices.length > 0) {
            this.populateLanguageSelector(langSelect, voices); // Ensure availableLanguages is populated
        }
        if(voiceSelect) this.populateVoiceSelector(voiceSelect, this.selectedLanguage);


        this.selectedVoice = null; 

        if (savedVoiceName && voices.length > 0) {
            this.selectedVoice = voices.find(voice => voice.name === savedVoiceName);
            if (this.selectedVoice && voiceSelect) voiceSelect.value = savedVoiceName;
        }

        if (!this.selectedVoice && voices.length > 0) {
            const langFamily = this.selectedLanguage.split('-')[0];
            const voicesForLang = voices.filter(v => v.lang.startsWith(langFamily));
            const defaultVoiceForLang = this.selectVoice(voicesForLang.length > 0 ? voicesForLang : voices);
            if (defaultVoiceForLang) {
                this.selectedVoice = defaultVoiceForLang;
                if (voiceSelect && langDataHasVoice(this.availableLanguages, this.selectedLanguage, defaultVoiceForLang.name)) {
                     voiceSelect.value = defaultVoiceForLang.name;
                }
            }
        }
        if (userInteracted) this.markUserInteracted();
    }
}
// Helper for loadVoicePreferences
function langDataHasVoice(availableLanguagesMap, langCode, voiceName) {
    const langData = availableLanguagesMap.get(langCode) || 
                     availableLanguagesMap.get(langCode.split('-')[0]) ||
                     Array.from(availableLanguagesMap.values()).find(ld => ld.voices.some(v => v.name === voiceName));
    return langData ? langData.voices.some(v => v.name === voiceName) : false;
}


window.agentLee = null; // Main instance

function initializeGlobalVoiceSelectorsStandalone() {
    const tempAgentForSelectors = new AgentLee(); // Temporary instance
    tempAgentForSelectors.initializeGlobalVoiceSelectors();
}

function startImmediateSpeech() {
    const agentLeeButton = document.getElementById('agent-lee-trigger-top');
    if (agentLeeButton) agentLeeButton.classList.add('glow');
    
    const tempAgentForSpeech = new AgentLee();
    getVoicesReadyPromise()
        .then(voices => {
            if (voices.length > 0) {
                tempAgentForSpeech.selectedVoice = tempAgentForSpeech.selectVoice(voices);
                tempAgentForSpeech.speakAudio("Hello. I am Agent Lee. I am your virtual assistant for Always Trucking. Please press the button and get started.");
            } else {
                console.warn("startImmediateSpeech: Promise resolved but no voices. Initial speech skipped.");
            }
        })
        .catch(error => {
            console.error("Failed to get voices for startImmediateSpeech:", error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof speechSynthesis !== 'undefined') {
        initializeGlobalVoiceSelectorsStandalone();
        setTimeout(startImmediateSpeech, 1500);
    } else {
        console.warn("Speech Synthesis API not supported. Agent Lee voice features will be disabled.");
    }

    const style = document.createElement('style');
    style.textContent = `
        #agent-lee { /* Base styles if needed */ }
        .agent-lee-hidden { display: none !important; }
        .agent-lee-visible { display: flex !important; }
    `;
    document.head.appendChild(style);

    const agentLeeTrigger = document.getElementById('agent-lee-trigger-top');
    // NOTE: agentLeeContainer is declared locally in show/hide.
    // NOTE: agentLeeCardInitialized is declared locally in show/hide.
    // NOTE: isAgentLeeVisible (the JS variable) is managed locally in show/hide.
    //       The primary determinant for toggle action is the DOM state.

    let positionAgentLeeCardFunction = null; // To store the function for adding/removing resize listener

    window.showAgentLeeCard = function() {
        let agentLeeContainer = document.getElementById('agent-lee'); // Get fresh reference
        let agentLeeCardInitialized = !!window.agentLee; // Check if main instance exists

        if (!agentLeeCardInitialized) {
            window.agentLee = new AgentLee(); // Create main instance
            window.agentLee.initialize();     // Initializes DOM, voice selectors for the main instance
            agentLeeContainer = document.getElementById('agent-lee'); // Re-fetch after creation
            agentLeeCardInitialized = true; // Mark as initialized
        }
        
        if (!agentLeeContainer) {
            console.error("showAgentLeeCard: agent-lee container not found even after initialization attempt.");
            return;
        }

        agentLeeContainer.classList.remove('agent-lee-hidden');
        agentLeeContainer.classList.add('agent-lee-visible');
        // isAgentLeeVisible = true; // JS state var, if needed globally beyond this scope.
                                   // For the toggle, DOM check is primary.
        if(window.agentLee) {
            window.agentLee.isActive = true;
            window.agentLee.updateFAQButtons(); 
        }

        // Define positioning function locally or ensure it's accessible
        positionAgentLeeCardFunction = function() { // Assign to the outer scope variable
            const businessCard = document.querySelector('.business-card-main');
            const currentAgentContainer = document.getElementById('agent-lee'); // Use current ref
            if (businessCard && currentAgentContainer && currentAgentContainer.classList.contains('agent-lee-visible')) {
                const cardRect = businessCard.getBoundingClientRect();
                let agentHeight = currentAgentContainer.offsetHeight;
                if (!agentHeight || agentHeight < 100) agentHeight = 480; 

                const minViewportMargin = 20; 
                const verticalOffset = 220; 

                if (window.innerWidth > 900) { 
                    currentAgentContainer.style.setProperty('position', 'absolute', 'important');
                    let newLeft = window.scrollX + cardRect.right + 32;
                    currentAgentContainer.style.setProperty('left', `${newLeft}px`, 'important');
                    let newTop = window.scrollY + cardRect.top + verticalOffset;
                    newTop = Math.max(newTop, minViewportMargin + window.scrollY); 
                    if (newTop + agentHeight > window.scrollY + window.innerHeight - minViewportMargin) {
                        newTop = window.scrollY + window.innerHeight - agentHeight - minViewportMargin;
                    }
                    newTop = Math.max(newTop, minViewportMargin + window.scrollY); 
                    currentAgentContainer.style.setProperty('top', `${newTop}px`, 'important');
                    currentAgentContainer.style.setProperty('z-index', '2004', 'important');
                    currentAgentContainer.style.setProperty('transform', 'none', 'important'); 
                } else { 
                    currentAgentContainer.style.setProperty('position', 'fixed', 'important');
                    currentAgentContainer.style.setProperty('left', '2vw', 'important');
                    currentAgentContainer.style.setProperty('top', '60px', 'important');
                    currentAgentContainer.style.setProperty('width', '96vw', 'important');
                    currentAgentContainer.style.setProperty('max-width', '98vw', 'important');
                    currentAgentContainer.style.setProperty('min-width', '0', 'important');
                    currentAgentContainer.style.setProperty('margin', '0', 'important');
                    currentAgentContainer.style.setProperty('z-index', '2004', 'important');
                    currentAgentContainer.style.setProperty('transform', 'none', 'important');
                }
            }
        }
        setTimeout(positionAgentLeeCardFunction, 50); // Position shortly after display
        window.addEventListener('resize', positionAgentLeeCardFunction);
        // --- Agent Lee's full intro speech after card is open ---
        setTimeout(() => {
            if(window.agentLee && window.agentLee.selectedVoice == null) {
                // Ensure a voice is selected
                const voices = window.speechSynthesis.getVoices();
                window.agentLee.selectedVoice = window.agentLee.selectVoice(voices);
            }
            if(window.agentLee) {
                window.agentLee.speak(
`Greetings from Always Trucking & Loading.  
I’m Agent Lee, and I’m here to guide you through what Antonio has created — a learning environment built on respect, resilience, and results.

As an instructor, Antonio brings more than experience — he brings care. He invests in every student’s growth, knowing that success in this industry takes both skill and character. He doesn’t just train drivers — he mentors future professionals.

If you’re looking for someone who believes in accountability, lifelong improvement, and helping others rise — you’re in the right place.

Let’s take that next step together.

Now if you have any questions, press the frequently asked question buttons.`
                , true);
            }
        }, 400);
    }

    window.hideAgentLeeCard = function() {
        const agentLeeContainer = document.getElementById('agent-lee');
        if (agentLeeContainer) {
            agentLeeContainer.classList.remove('agent-lee-visible');
            agentLeeContainer.classList.add('agent-lee-hidden');
            if(window.agentLee) window.agentLee.stopSpeaking();
        }
        // isAgentLeeVisible = false; // JS state var
        if(window.agentLee) window.agentLee.isActive = false;

        // Remove the resize listener when card is hidden
        if (positionAgentLeeCardFunction) {
            window.removeEventListener('resize', positionAgentLeeCardFunction);
        }
    }

    if (agentLeeTrigger) {
        agentLeeTrigger.addEventListener('click', function() {
            const agentLeeElement = document.getElementById('agent-lee'); // Get current DOM element
            
            // Determine visibility based on current DOM state
            // It's possible agentLeeElement is null if createAgentElement hasn't run or failed.
            // showAgentLeeCard handles creation if needed.
            const isCurrentlyVisible = agentLeeElement && agentLeeElement.classList.contains('agent-lee-visible');

            if (!isCurrentlyVisible) {
                window.showAgentLeeCard();
                agentLeeTrigger.classList.remove('glow');
            } else {
                window.hideAgentLeeCard();
            }
        });
    }
});
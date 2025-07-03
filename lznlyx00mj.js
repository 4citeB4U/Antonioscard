/**
 * Agent Lee - Interactive assistant for Always Trucking & Loading LLC
 * Provides engaging information about trucking services and training
 */

class AgentLee {
    constructor() {
        this.name = "Lee";
        this.role = "Always Trucking Assistant";
        this.isActive = false;
        this.isSpeaking = false;
        this.avatarImage = "lmlz7zis45.png";
        this.selectedLanguage = 'en-US';
        this.selectedVoice = null;
        this.availableLanguages = new Map();
        this.userHasInteracted = false;
        
// Multilingual messages for different interactions
this.messages = {
  'en-US': {
    greetings: [
      "Hello, I’m Agent Lee, your assistant here at Always Trucking & Loading. Let me introduce you to Antonio — not just an instructor, but a leader who truly believes in the power of personal growth. His mission is to help every student build not just a skillset, but a future. This platform reflects his commitment to quality training, real-world readiness, and lifelong improvement. Welcome to a place where your progress matters.",
      "Welcome — I’m Agent Lee, and I’d like you to meet someone who sets a higher standard. Antonio, the founder and instructor here at Always Trucking, brings deep knowledge, integrity, and a sincere belief in helping others succeed. He built this program for people who want more than a license — people who want a career they can be proud of. Take a look around — the road ahead starts here.",
      "Greetings from Always Trucking & Loading. I’m Agent Lee, and I’m here to guide you through what Anthony has created — a learning environment built on respect, resilience, and results. As an instructor, he invests in every student’s growth, knowing that success in this industry takes both skill and character. If you're ready to take your next step, you're in good hands here."
    ],
    initialPrompt: "Hello! I'm Agent Lee from Always Trucking & Loading. Please first select your preferred language and voice from the controls at the bottom left, then click the glowing Agent Lee button to open my full interface and get started!",
    languagePrompt: "Welcome! Please select your preferred language and voice from the selectors above, then I'll be ready to assist you."
  },
  'es-ES': {
    greetings: [
      "Hola, soy el Agente Lee, su asistente aquí en Always Trucking & Loading. Permíteme presentarte a Antonio — no solo un instructor, sino un líder que realmente cree en el poder del crecimiento personal. Su misión es ayudar a cada estudiante a construir no solo un conjunto de habilidades, sino un futuro. Esta plataforma refleja su compromiso con el entrenamiento de calidad, la preparación para el mundo real y la mejora de por vida. Bienvenido a un lugar donde tu progreso importa.",
      "Bienvenido — Soy el Agente Lee, y me gustaría que conozcas a alguien que establece un estándar más alto. Antonio, el fundador e instructor aquí en Always Trucking, aporta conocimiento profundo, integridad y una creencia sincera en ayudar a otros a tener éxito. Construyó este programa para personas que quieren más que una licencia — personas que quieren una carrera de la que puedan estar orgullosos. Echa un vistazo — el camino hacia adelante comienza aquí."
    ],
    initialPrompt: "¡Hola! Soy el Agente Lee de Always Trucking & Loading. Por favor, primero seleccione su idioma y voz preferidos de los controles en la parte inferior izquierda, luego haga clic en el botón brillante del Agente Lee para abrir mi interfaz completa y comenzar.",
    languagePrompt: "¡Bienvenido! Por favor seleccione su idioma y voz preferidos de los selectores arriba, entonces estaré listo para asistirle."
  },
  'fr-FR': {
    greetings: [
      "Bonjour, je suis l'Agent Lee, votre assistant ici chez Always Trucking & Loading. Permettez-moi de vous présenter Antonio — pas seulement un instructeur, mais un leader qui croit vraiment au pouvoir de la croissance personnelle. Sa mission est d'aider chaque étudiant à construire non seulement un ensemble de compétences, mais un avenir. Cette plateforme reflète son engagement envers une formation de qualité, une préparation au monde réel et une amélioration à vie. Bienvenue dans un endroit où vos progrès comptent.",
      "Bienvenue — Je suis l'Agent Lee, et j'aimerais vous présenter quelqu'un qui établit un standard plus élevé. Antonio, le fondateur et instructeur ici chez Always Trucking, apporte une connaissance approfondie, de l'intégrité et une croyance sincère dans l'aide aux autres pour réussir. Il a construit ce programme pour les personnes qui veulent plus qu'un permis — des personnes qui veulent une carrière dont elles peuvent être fières. Regardez autour de vous — la route vers l'avant commence ici."
    ],
    initialPrompt: "Bonjour! Je suis l'Agent Lee d'Always Trucking & Loading. Veuillez d'abord sélectionner votre langue et voix préférées dans les contrôles en bas à gauche, puis cliquez sur le bouton brillant Agent Lee pour ouvrir mon interface complète et commencer!",
    languagePrompt: "Bienvenue! Veuillez sélectionner votre langue et voix préférées dans les sélecteurs ci-dessus, alors je serai prêt à vous assister."
  },
  'de-DE': {
    greetings: [
      "Hallo, ich bin Agent Lee, Ihr Assistent hier bei Always Trucking & Loading. Lassen Sie mich Ihnen Antonio vorstellen — nicht nur ein Ausbilder, sondern ein Führungskraft, der wirklich an die Kraft des persönlichen Wachstums glaubt. Seine Mission ist es, jedem Schüler zu helfen, nicht nur Fähigkeiten, sondern eine Zukunft aufzubauen. Diese Plattform spiegelt sein Engagement für Qualitätsausbildung, Realitätsvorbereitung und lebenslange Verbesserung wider. Willkommen an einem Ort, wo Ihr Fortschritt zählt.",
      "Willkommen — Ich bin Agent Lee, und ich möchte Ihnen jemanden vorstellen, der einen höheren Standard setzt. Antonio, der Gründer und Ausbilder hier bei Always Trucking, bringt tiefes Wissen, Integrität und einen aufrichtigen Glauben daran mit, anderen zum Erfolg zu verhelfen. Er hat dieses Programm für Menschen gebaut, die mehr als nur einen Führerschein wollen — Menschen, die eine Karriere wollen, auf die sie stolz sein können. Schauen Sie sich um — der Weg nach vorn beginnt hier."
    ],
    initialPrompt: "Hallo! Ich bin Agent Lee von Always Trucking & Loading. Bitte wählen Sie zuerst Ihre bevorzugte Sprache und Stimme aus den Steuerelementen unten links aus, dann klicken Sie auf die leuchtende Agent Lee-Taste, um meine vollständige Benutzeroberfläche zu öffnen und zu beginnen!",
    languagePrompt: "Willkommen! Bitte wählen Sie Ihre bevorzugte Sprache und Stimme aus den Selektoren oben aus, dann bin ich bereit, Ihnen zu helfen."
  },
  'it-IT': {
    greetings: [
      "Ciao, sono l'Agente Lee, il vostro assistente qui ad Always Trucking & Loading. Permettetemi di presentarvi Antonio — non solo un istruttore, ma un leader che crede veramente nel potere della crescita personale. La sua missione è aiutare ogni studente a costruire non solo un set di competenze, ma un futuro. Questa piattaforma riflette il suo impegno per la formazione di qualità, la preparazione al mondo reale e il miglioramento per tutta la vita. Benvenuti in un posto dove i vostri progressi contano.",
      "Benvenuti — Sono l'Agente Lee, e vorrei farvi conoscere qualcuno che stabilisce uno standard più alto. Antonio, il fondatore e istruttore qui ad Always Trucking, porta conoscenza profonda, integrità e una sincera convinzione nell'aiutare gli altri a riuscire. Ha costruito questo programma per persone che vogliono più di una licenza — persone che vogliono una carriera di cui possono essere orgogliosi. Guardate intorno — la strada da percorrere inizia qui."
    ],
    initialPrompt: "Ciao! Sono l'Agente Lee di Always Trucking & Loading. Per favore, selezionate prima la vostra lingua e voce preferite dai controlli in basso a sinistra, poi cliccate sul pulsante brillante dell'Agente Lee per aprire la mia interfaccia completa e iniziare!",
    languagePrompt: "Benvenuti! Per favore selezionate la vostra lingua e voce preferite dai selettori sopra, allora sarò pronto ad assistervi."
  },
  'zh-CN': {
    greetings: [
      "您好，我是李探员，您在Always Trucking & Loading的助手。让我向您介绍安东尼奥——他不仅仅是一名教练，更是一位真正相信个人成长力量的领导者。他的使命是帮助每个学生不仅建立技能，更是建立未来。这个平台体现了他对优质培训、现实世界准备和终身改进的承诺。欢迎来到一个您的进步很重要的地方。",
      "欢迎——我是李探员，我想让您认识一个设定更高标准的人。安东尼奥，Always Trucking的创始人和教练，带来了深厚的知识、诚信和帮助他人成功的真诚信念。他为那些想要的不仅仅是执照的人建立了这个项目——那些想要一个可以为之自豪的职业的人。看看周围——前进的道路从这里开始。"
    ],
    initialPrompt: "您好！我是Always Trucking & Loading的李探员。请首先从左下角的控件中选择您首选的语言和声音，然后点击发光的李探员按钮打开我的完整界面并开始！",
    languagePrompt: "欢迎！请从上面的选择器中选择您首选的语言和声音，然后我就准备好为您提供帮助了。"
  },
  'ja-JP': {
    greetings: [
      "こんにちは、私はエージェント・リーです。Always Trucking & Loadingでのあなたのアシスタントです。アントニオをご紹介させてください。彼は単なるインストラクターではなく、個人の成長の力を真に信じるリーダーです。彼の使命は、すべての学生がスキルセットだけでなく、未来を築くのを助けることです。このプラットフォームは、質の高いトレーニング、現実世界への準備、そして生涯にわたる改善への彼のコミットメントを反映しています。あなたの進歩が重要な場所へようこそ。",
      "ようこそ — 私はエージェント・リーです。より高い基準を設定する人をご紹介したいと思います。Always Truckingの創設者でありインストラクターであるアントニオは、深い知識、誠実さ、そして他の人の成功を助けるという誠実な信念をもたらします。彼は免許以上のものを求める人々のためにこのプログラムを構築しました — 誇りに思えるキャリアを求める人々のために。周りを見回してください — 前進への道はここから始まります。"
    ],
    initialPrompt: "こんにちは！私はAlways Trucking & Loadingのエージェント・リーです。まず左下のコントロールからお好みの言語と音声を選択し、次に光るエージェント・リーボタンをクリックして私の完全なインターフェースを開いて始めてください！",
    languagePrompt: "ようこそ！上のセレクターからお好みの言語と音声を選択してください。そうすれば、お手伝いする準備ができます。"
  }
};


        // FAQ topics will be retrieved based on current language
        this.faqTopics = this.getCurrentFAQTopics();
    }

    // Initialize the agent on the page
    initialize() {
        // Initialize global voice selectors first
        this.initializeGlobalVoiceSelectors();

        // Create agent container if it doesn't exist
        if (!document.getElementById('agent-lee')) {
            this.createAgentElement();
            this.addEventListeners();

            // Wait for DOM to be fully loaded then center cards
            if (document.readyState === 'complete') {
                this.centerCards();
            } else {
                window.addEventListener('load', () => {
                    this.centerCards();
                });
            }

            // Begin speaking after a short delay
            setTimeout(() => {
                if (this.userHasInteracted || localStorage.getItem('agentlee-voice-selected')) {
                    this.speak(this.getRandomItem(this.getCurrentMessages().greetings));
                } else {
                    // Speak immediately and prompt for language selection
                    this.speak(this.getCurrentMessages().languagePrompt);
                }
            }, 1000);
        }
    }

    // Create the agent element in the DOM
    createAgentElement() {
        const agentContainer = document.createElement('div');
        agentContainer.id = 'agent-lee';
        agentContainer.className = 'agent-lee';
        
        // Create HTML for agent
        agentContainer.innerHTML = `
            <div class="agent-card">
                <div class="agent-header">
                    <div class="agent-avatar">
                        <img src="${this.avatarImage}" alt="Agent Lee">
                    </div>
                    <div class="agent-info">
                        <h3>Agent Lee</h3>
                        <p>Always Trucking Assistant</p>
                    </div>
                    <button class="minimize-agent" title="Minimize">_</button>
                </div>
                
                <div class="agent-body">
                    <div class="speech-bubble">
                        <p id="agent-speech"></p>
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    
                    <div class="agent-controls">
                        <button class="control-button stop-speaking" title="Stop Speaking">
                            <i class="fas fa-volume-mute"></i>
                        </button>
                        <button class="control-button speak-again" title="Speak Again">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    
                    <div class="common-questions">
                        <h4>Ask about:</h4>
                        <div class="question-buttons">
                            <!-- Question buttons will be added here dynamically -->
                        </div>
                    </div>
                </div>
                
                <div class="agent-footer">
                    <div class="action-links">
                        <a href="tel:4142399333" class="action-link phone-link">
                            <i class="fas fa-phone"></i> (414) 239-9333
                        </a>
                        <a href="tel:4149827034" class="action-link phone-link">
                            <i class="fas fa-phone"></i> (414) 982-7034
                        </a>
                        <a href="mailto:Anthony@alwaystruckingandloading.com" class="action-link email-link">
                            <i class="fas fa-envelope"></i> Email Us
                        </a>
                        <a href="http://alwaystruckingandloading.com" target="_blank" class="action-link website-link">
                            <i class="fas fa-globe"></i> Website
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Add to the page
        document.body.appendChild(agentContainer);
        
        // Add FAQ topic buttons
        const topicContainer = agentContainer.querySelector('.question-buttons');
        this.faqTopics.forEach((topic, index) => {
            const button = document.createElement('button');
            button.className = 'question-button';
            button.textContent = topic.question;
            button.dataset.topicIndex = index;
            topicContainer.appendChild(button);
        });
    }

    // Center both cards in the middle of the screen
    centerCards() {
        // Create a container for both cards
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards-container';
        
        // Get the business card and agent card
        const businessCard = document.querySelector('.business-card');
        const agentCard = document.querySelector('.agent-lee');
        
        if (businessCard && agentCard) {
            // Add the container to the body first
            document.body.appendChild(cardsContainer);
            
            // Move both cards into the container (don't clone)
            cardsContainer.appendChild(businessCard);
            cardsContainer.appendChild(agentCard);
        }
    }

    // Add event listeners for agent interactions
    addEventListeners() {
        // Minimize/close agent - connect to global hide function
        const minimizeBtn = document.querySelector('.minimize-agent');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                // Call the global hide function to properly close the Agent Lee card
                if (window.hideAgentLeeCard) {
                    window.hideAgentLeeCard();
                }
            });
        }
        
        // FAQ topic buttons
        const questionButtons = document.querySelectorAll('.question-button');
        questionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const topicIndex = button.dataset.topicIndex;
                const topic = this.faqTopics[topicIndex];
                this.speak(`${topic.answer} ${topic.cta}`);
                
                // Highlight the selected button
                document.querySelectorAll('.question-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            });
        });
        
        // Stop speaking button
        const stopSpeakingBtn = document.querySelector('.stop-speaking');
        if (stopSpeakingBtn) {
            stopSpeakingBtn.addEventListener('click', () => {
                this.stopSpeaking();
            });
        }
        
        // Speak again button
        const speakAgainBtn = document.querySelector('.speak-again');
        if (speakAgainBtn) {
            speakAgainBtn.addEventListener('click', () => {
                const speechText = document.getElementById('agent-speech').textContent;
                if (speechText) {
                    this.speak(speechText, true);
                } else {
                    this.speak(this.getRandomItem(this.greetings));
                }
            });
        }
    }

    // Speak a message with typing animation
    speak(message, skipTyping = false) {
        // Cancel any ongoing speech
        this.stopSpeaking();
        
        this.isSpeaking = true;
        
        // Get speech element and typing indicator
        const speechElement = document.getElementById('agent-speech');
        const typingIndicator = document.querySelector('.typing-indicator');
        
        if (skipTyping) {
            // Skip typing animation
            speechElement.textContent = message;
            this.speakAudio(message);
        } else {
            // Show typing indicator
            speechElement.textContent = '';
            typingIndicator.style.display = 'flex';
            
            // Simulate typing delay (shorter)
            setTimeout(() => {
                // Hide typing indicator and show message
                typingIndicator.style.display = 'none';
                speechElement.textContent = message;
                
                // Speak the message
                this.speakAudio(message);
            }, 800);
        }
    }
    
    // Use speech synthesis to speak the message
    speakAudio(message) {
        // Use speech synthesis if available
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(message);
            speech.rate = 1;
            speech.pitch = 1;
            speech.volume = 1;

            // Use globally selected voice if available
            let selectedVoice = this.selectedVoice;

            if (!selectedVoice) {
                // Fall back to automatic selection
                const voices = speechSynthesis.getVoices();
                selectedVoice = this.selectVoice(voices);
            }

            if (selectedVoice) {
                speech.voice = selectedVoice;
                speech.lang = selectedVoice.lang;
            }

            window.speechSynthesis.speak(speech);

            // When speech ends
            speech.onend = () => {
                this.isSpeaking = false;
            };
        } else {
            // No speech synthesis available
            setTimeout(() => {
                this.isSpeaking = false;
            }, 3000);
        }
    }
    
    // Stop any ongoing speech
    stopSpeaking() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        this.isSpeaking = false;
    }

    // Select a good voice for the agent (prioritizing male voices)
    selectVoice(voices) {
        // Prefer male voices in order - Microsoft David first
        const preferredMaleVoices = [
            'Microsoft David Desktop',
            'Microsoft David',
            'David',
            'Google US English Male',
            'Alex',
            'Daniel',
            'Mark',
            'Aaron'
        ];

        // Try to find a preferred male voice
        for (const preferred of preferredMaleVoices) {
            const match = voices.find(voice => voice.name.includes(preferred));
            if (match) return match;
        }

        // Filter for likely male voices
        const maleVoices = this.filterMaleVoices(voices.filter(voice => voice.lang.startsWith('en-')));
        if (maleVoices.length > 0) {
            return maleVoices[0];
        }

        // Fall back to any English voice
        const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
        if (englishVoice) return englishVoice;

        // Last resort: first available voice
        return voices[0];
    }

    // Get a random item from an array
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Get current language messages
    getCurrentMessages() {
        const currentLang = this.selectedLanguage || 'en-US';
        return this.messages[currentLang] || this.messages['en-US'];
    }

    // Get language-specific voice filtering
    getLanguageSpecificVoices(voices, language) {
        // Filter voices for the selected language
        const languageVoices = voices.filter(voice => voice.lang.startsWith(language.split('-')[0]));

        // If no voices for the language, fall back to English
        if (languageVoices.length === 0) {
            return voices.filter(voice => voice.lang.startsWith('en'));
        }

        return languageVoices;
    }

    // Get current FAQ topics based on language
    getCurrentFAQTopics() {
        const currentLang = this.selectedLanguage || 'en-US';

        // English FAQ topics
        const englishFAQ = [
            {
                question: "What CDL training programs do you offer?",
                answer: "We offer comprehensive CDL Class A and B training programs, refresher courses, and specialized endorsement training for hazardous materials, tankers, and passenger vehicles.",
                cta: "Visit our website for more details!"
            },
            {
                question: "How long does CDL training take?",
                answer: "Our full CDL training typically takes 3-6 weeks, depending on the program and your schedule. We offer both full-time and part-time options to accommodate your needs.",
                cta: "Ready to start your training journey?"
            },
            {
                question: "What are the costs for CDL training?",
                answer: "Our training programs are competitively priced with flexible payment options. We offer financing for qualified students and special rates for veterans.",
                cta: "Contact us for pricing details!"
            },
            {
                question: "Do you help with job placement?",
                answer: "Absolutely! We have strong relationships with trucking companies across the region and provide job placement assistance to help you start your new career.",
                cta: "Start your new career today!"
            },
            {
                question: "Who is the instructor?",
                answer: "Our lead instructor is Anthony, who brings over 15 years of industry experience to the classroom. He's a certified instructor passionate about training professional drivers.",
                cta: "Learn from the best in the industry!"
            }
        ];

        // Spanish FAQ topics
        const spanishFAQ = [
            {
                question: "¿Qué programas de entrenamiento CDL ofrecen?",
                answer: "Ofrecemos programas completos de entrenamiento CDL Clase A y B, cursos de repaso y entrenamiento especializado para materiales peligrosos, tanques y vehículos de pasajeros.",
                cta: "¡Visite nuestro sitio web para más detalles!"
            },
            {
                question: "¿Cuánto tiempo toma el entrenamiento CDL?",
                answer: "Nuestro entrenamiento CDL completo típicamente toma 3-6 semanas, dependiendo del programa y su horario. Ofrecemos opciones de tiempo completo y medio tiempo para acomodar sus necesidades.",
                cta: "¿Listo para comenzar su viaje de entrenamiento?"
            },
            {
                question: "¿Cuáles son los costos del entrenamiento CDL?",
                answer: "Nuestros programas de entrenamiento tienen precios competitivos con opciones de pago flexibles. Ofrecemos financiamiento para estudiantes calificados y tarifas especiales para veteranos.",
                cta: "¡Contáctenos para detalles de precios!"
            },
            {
                question: "¿Ayudan con la colocación laboral?",
                answer: "¡Absolutamente! Tenemos relaciones sólidas con compañías de camiones en toda la región y proporcionamos asistencia de colocación laboral para ayudarle a comenzar su nueva carrera.",
                cta: "¡Comience su nueva carrera hoy!"
            },
            {
                question: "¿Quién es el instructor?",
                answer: "Nuestro instructor principal es Anthony, quien aporta más de 15 años de experiencia en la industria al aula. Es un instructor certificado apasionado por entrenar conductores profesionales.",
                cta: "¡Aprenda de lo mejor en la industria!"
            }
        ];

        // Return appropriate FAQ based on language
        if (currentLang.startsWith('es')) {
            return spanishFAQ;
        }

        // Default to English for all other languages
        return englishFAQ;
    }

    // Initialize global voice selectors
    initializeGlobalVoiceSelectors() {
        const langSelect = document.getElementById('lang-select');
        const voiceSelect = document.getElementById('voice-select');

        if (!langSelect || !voiceSelect) {
            return;
        }

        // Wait for voices to be available
        const setupSelectors = () => {
            const voices = window.speechSynthesis.getVoices();

            if (voices.length === 0) {
                return;
            }

            this.populateLanguageSelector(langSelect, voices);
            this.populateVoiceSelector(voiceSelect);
            this.addGlobalSelectorListeners(langSelect, voiceSelect);

            // Load saved preferences
            this.loadVoicePreferences(langSelect, voiceSelect);
        };

        if (window.speechSynthesis.getVoices().length > 0) {
            setupSelectors();
        } else {
            window.speechSynthesis.onvoiceschanged = setupSelectors;
        }
    }

    // Populate language selector with available languages
    populateLanguageSelector(langSelect, voices) {
        // Group voices by language
        this.availableLanguages.clear();

        voices.forEach(voice => {
            const lang = voice.lang;
            const langName = this.getLanguageName(lang);

            if (!this.availableLanguages.has(lang)) {
                this.availableLanguages.set(lang, {
                    name: langName,
                    voices: []
                });
            }
            this.availableLanguages.get(lang).voices.push(voice);
        });

        // Populate language dropdown
        langSelect.innerHTML = '<option value="">Select Language</option>';

        // Sort languages with English first
        const sortedLangs = Array.from(this.availableLanguages.keys()).sort((a, b) => {
            if (a.startsWith('en-')) return -1;
            if (b.startsWith('en-')) return 1;
            return this.availableLanguages.get(a).name.localeCompare(this.availableLanguages.get(b).name);
        });

        sortedLangs.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = this.availableLanguages.get(lang).name;
            langSelect.appendChild(option);
        });
    }

    // Populate voice selector with filtered voices for selected language
    populateVoiceSelector(voiceSelect, selectedLang = 'en-US') {
        voiceSelect.innerHTML = '<option value="">Select Voice</option>';

        if (!selectedLang || !this.availableLanguages.has(selectedLang)) {
            return;
        }

        const languageVoices = this.availableLanguages.get(selectedLang).voices;

        // For non-English languages, show all available voices (male and female)
        // For English, filter for male voices only
        let filteredVoices;
        if (selectedLang.startsWith('en-')) {
            filteredVoices = this.filterMaleVoices(languageVoices);
        } else {
            // For other languages, show all voices but prioritize male ones
            const maleVoices = this.filterMaleVoices(languageVoices);
            const femaleVoices = languageVoices.filter(voice => !maleVoices.includes(voice));
            filteredVoices = [...maleVoices, ...femaleVoices]; // Male voices first
        }

        filteredVoices.forEach((voice) => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = this.getVoiceDisplayName(voice);
            voiceSelect.appendChild(option);
        });
    }

    // Filter for male, natural-sounding voices
    filterMaleVoices(voices) {
        // Prioritize high-quality male voices
        const maleKeywords = ['male', 'man', 'david', 'mark', 'alex', 'daniel', 'james', 'thomas', 'aaron', 'arthur'];
        const qualityProviders = ['Microsoft', 'Google', 'Apple', 'Amazon'];

        const maleVoices = voices.filter(voice => {
            const name = voice.name.toLowerCase();
            const isLikelyMale = maleKeywords.some(keyword => name.includes(keyword)) ||
                               (!name.includes('female') && !name.includes('woman') &&
                                !name.includes('zira') && !name.includes('cortana') &&
                                !name.includes('samantha') && !name.includes('susan') &&
                                !name.includes('karen') && !name.includes('hazel'));
            return isLikelyMale;
        });

        // Sort by quality (prioritize known good providers)
        return maleVoices.sort((a, b) => {
            const aQuality = qualityProviders.some(provider => a.name.includes(provider)) ? 1 : 0;
            const bQuality = qualityProviders.some(provider => b.name.includes(provider)) ? 1 : 0;
            return bQuality - aQuality;
        });
    }

    // Get display name for voice
    getVoiceDisplayName(voice) {
        // Clean up voice name for display
        let displayName = voice.name;

        // Remove common suffixes
        displayName = displayName.replace(/ - \w+$/, '');
        displayName = displayName.replace(/ Desktop$/, '');
        displayName = displayName.replace(/ \(Enhanced\)$/, '');

        return displayName;
    }

    // Get human-readable language name
    getLanguageName(langCode) {
        const languageNames = {
            'en-US': 'English (US)',
            'en-GB': 'English (UK)',
            'en-AU': 'English (Australia)',
            'en-CA': 'English (Canada)',
            'es-ES': 'Spanish (Spain)',
            'es-MX': 'Spanish (Mexico)',
            'fr-FR': 'French (France)',
            'fr-CA': 'French (Canada)',
            'de-DE': 'German',
            'it-IT': 'Italian',
            'pt-BR': 'Portuguese (Brazil)',
            'pt-PT': 'Portuguese (Portugal)',
            'ru-RU': 'Russian',
            'ja-JP': 'Japanese',
            'ko-KR': 'Korean',
            'zh-CN': 'Chinese (Simplified)',
            'zh-TW': 'Chinese (Traditional)',
            'ar-SA': 'Arabic',
            'hi-IN': 'Hindi',
            'th-TH': 'Thai',
            'vi-VN': 'Vietnamese'
        };

        return languageNames[langCode] || langCode;
    }

    // Add event listeners for global selectors
    addGlobalSelectorListeners(langSelect, voiceSelect) {
        langSelect.addEventListener('change', () => {
            const selectedLang = langSelect.value;
            this.selectedLanguage = selectedLang;

            if (selectedLang) {
                this.populateVoiceSelector(voiceSelect, selectedLang);
                this.markUserInteracted();
            }

            // Clear voice selection when language changes
            voiceSelect.value = '';
            this.selectedVoice = null;
        });

        voiceSelect.addEventListener('change', () => {
            const selectedVoiceName = voiceSelect.value;

            if (selectedVoiceName) {
                const voices = window.speechSynthesis.getVoices();
                this.selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
                this.markUserInteracted();
                this.saveVoicePreferences();

                // Test the voice with a greeting in the selected language
                const testMessage = this.getCurrentMessages().greetings[0].substring(0, 100) + "...";
                this.speak(testMessage, true);
            }
        });
    }

    // Mark that user has interacted with selectors
    markUserInteracted() {
        this.userHasInteracted = true;
        const selectors = document.querySelector('.lang-voice-selectors');
        if (selectors) {
            selectors.classList.add('user-interacted');
        }
    }

    // Save voice preferences to localStorage
    saveVoicePreferences() {
        if (this.selectedLanguage && this.selectedVoice) {
            localStorage.setItem('agentlee-language', this.selectedLanguage);
            localStorage.setItem('agentlee-voice', this.selectedVoice.name);
            localStorage.setItem('agentlee-voice-selected', 'true');
        }
    }

    // Load voice preferences from localStorage
    loadVoicePreferences(langSelect, voiceSelect) {
        const savedLang = localStorage.getItem('agentlee-language');
        const savedVoice = localStorage.getItem('agentlee-voice');

        if (savedLang && savedVoice) {
            langSelect.value = savedLang;
            this.selectedLanguage = savedLang;

            // Populate voice selector for saved language
            this.populateVoiceSelector(voiceSelect, savedLang);

            // Set saved voice
            voiceSelect.value = savedVoice;
            const voices = window.speechSynthesis.getVoices();
            this.selectedVoice = voices.find(voice => voice.name === savedVoice);

            if (this.selectedVoice) {
                this.markUserInteracted();
            }
        } else {
            // Set default to English and Microsoft David if available
            langSelect.value = 'en-US';
            this.selectedLanguage = 'en-US';
            this.populateVoiceSelector(voiceSelect, 'en-US');

            // Try to set Microsoft David as default
            const voices = window.speechSynthesis.getVoices();
            const davidVoice = voices.find(voice =>
                voice.name.includes('David') && voice.lang.startsWith('en-')
            );

            if (davidVoice) {
                voiceSelect.value = davidVoice.name;
                this.selectedVoice = davidVoice;
                this.saveVoicePreferences();
                this.markUserInteracted();
            }
        }
    }

    // Prompt user to select voice
    promptVoiceSelection() {
        const speechElement = document.getElementById('agent-speech');

        if (speechElement) {
            speechElement.textContent = "Welcome! Please select your preferred language and voice from the selectors above, then I'll be ready to assist you.";
        }
    }
}

// Initialize global voice selectors immediately
function initializeGlobalVoiceSelectorsStandalone() {
    const langSelect = document.getElementById('lang-select');
    const voiceSelect = document.getElementById('voice-select');

    if (!langSelect || !voiceSelect) {
        return;
    }

    // Create a temporary instance for voice management
    const tempAgent = new AgentLee();
    tempAgent.initializeGlobalVoiceSelectors();
}

// Start immediate speech when page loads
function startImmediateSpeech() {
    const agentLeeButton = document.getElementById('agent-lee-trigger');

    // Add glow effect to Agent Lee button
    if (agentLeeButton) {
        agentLeeButton.classList.add('glow');
    }

    // Create temporary agent for immediate speech
    const tempAgent = new AgentLee();

    // Speak immediately with Microsoft David voice (English)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        tempAgent.selectedVoice = tempAgent.selectVoice(voices);
        tempAgent.speakAudio(tempAgent.getCurrentMessages().initialPrompt);
    } else {
        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = () => {
            const loadedVoices = window.speechSynthesis.getVoices();
            tempAgent.selectedVoice = tempAgent.selectVoice(loadedVoices);
            tempAgent.speakAudio(tempAgent.getCurrentMessages().initialPrompt);
        };
    }
}

// Initialize agent when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize global voice selectors first
    initializeGlobalVoiceSelectorsStandalone();

    // Start Agent Lee speaking immediately after page load
    setTimeout(() => {
        startImmediateSpeech();
    }, 2000);

    // Remove the common questions button if it exists
    const commonQuestionsButton = document.querySelector('.faq-button');
    if (commonQuestionsButton) {
        commonQuestionsButton.remove();
    }
    
    // Add CSS for both cards
    const style = document.createElement('style');
    style.textContent = `
        /* ...existing styles... */
        .agent-lee-hidden { display: none !important; }
        .agent-lee-visible { display: flex !important; }
    `;
    document.head.appendChild(style);

    // Agent Lee toggle logic
    const agentLeeTrigger = document.getElementById('agent-lee-trigger');
    let agentLeeContainer = null;
    let agentLeeInitialized = false;
    let visible = false;

    function showAgentLeeCard() {
        if (!agentLeeInitialized) {
            window.agentLee = new AgentLee();
            window.agentLee.initialize();
            agentLeeContainer = document.getElementById('agent-lee');
            agentLeeInitialized = true;
        } else {
            agentLeeContainer = document.getElementById('agent-lee');
            agentLeeContainer.classList.remove('agent-lee-hidden');
            agentLeeContainer.classList.add('agent-lee-visible');
        }
        visible = true; // Update the toggle state

        // Desktop: place to the right, Mobile: place below
        const businessCardWrapper = document.querySelector('.business-card-wrapper');
        if (window.innerWidth > 900) {
            // Side by side
            businessCardWrapper.parentNode.insertBefore(agentLeeContainer, businessCardWrapper.nextSibling);
        } else {
            // Below
            businessCardWrapper.parentNode.insertBefore(agentLeeContainer, businessCardWrapper.nextSibling);
        }
    }

    function hideAgentLeeCard() {
        if (agentLeeContainer) {
            agentLeeContainer.classList.remove('agent-lee-visible');
            agentLeeContainer.classList.add('agent-lee-hidden');
            visible = false; // Update the toggle state
        }
    }

    // Make hideAgentLeeCard globally accessible
    window.hideAgentLeeCard = hideAgentLeeCard;

    if (agentLeeTrigger) {
        agentLeeTrigger.addEventListener('click', function() {
            visible = !visible;
            if (visible) {
                showAgentLeeCard();
            } else {
                hideAgentLeeCard();
            }
        });
    }
});
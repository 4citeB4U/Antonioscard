/**
 * Agent Leonard - Always Trucking & Loading LLC Assistant
 * This agent provides information about Always Trucking services and CDL training
 */

class AgentLeonard {
    constructor() {
        this.name = "Agent Lee";
        this.role = "Always Trucking & Loading LLC Assistant";
        this.welcomeMessage = `Welcome to Always Trucking & Loading — proudly headquartered in Milwaukee, Wisconsin. I’m Agent Lee, your AI assistant and guide.\n\nLet me introduce you to Anthony — a dedicated owner, instructor, and the heart behind this operation. Anthony is more than just a trucking expert; he’s a mentor committed to your growth. With years of experience on the road and in the classroom, he understands what it takes to help everyday people become skilled professionals in a vital industry.\n\nThis site isn’t just a business card — it’s a vision. A vision for logistics, leadership, and lifelong learning. Anthony believes in pushing yourself — professionally and personally — and he built this platform to support that journey.\n\nWhether you're new to CDL training or looking to sharpen your skills, Always Trucking & Loading LLC is your home base. Explore our services, save this contact, and reach out today.\n\nLet’s roll forward — together.`;
        this.commonQuestions = {
            "what services": this.getServicesInfo,
            "cdl training": this.getCDLTrainingInfo,
            "cost": this.getPricingInfo,
            "how long": this.getTrainingDurationInfo,
            "where located": this.getLocationInfo,
            "instructor": this.getInstructorInfo,
            "requirements": this.getRequirementsInfo,
            "contact": this.getContactInfo
        };
    }

    /**
     * Main function to process user questions
     */
    processQuestion(question) {
        const lowercaseQuestion = question.toLowerCase();
        
        // Check if question matches any common topics
        for (const keyword in this.commonQuestions) {
            if (lowercaseQuestion.includes(keyword)) {
                return this.commonQuestions[keyword]();
            }
        }
        
        // Default response with invitation to visit website
        return this.getDefaultResponse();
    }

    getServicesInfo() {
        return {
            message: `Always Trucking & Loading LLC offers comprehensive services including:
                • CDL Training and Certification
                • Dispatcher Training
                • Hours of Service Compliance Training
                • Vehicle Inspection & Maintenance Courses
                • Defensive Driving Programs
                • TMS (Transportation Management System) Training
                • Fleet Safety & Compliance Programs

                Visit our website at http://alwaystruckingandloading.com to explore our full range of professional trucking services and training programs.`,
            cta: "Visit our website to learn more about our services!"
        };
    }

    getCDLTrainingInfo() {
        return {
            message: `Our CDL Training program is designed to help you become a professional truck driver or enhance your existing skills.

                • Comprehensive curriculum covering all CDL requirements
                • Hands-on training with experienced instructors
                • Preparation for written and road tests
                • Focus on safety protocols and industry regulations
                • Continuing education for current CDL holders

                Anthony, our Owner/Instructor, brings years of industry experience to ensure you receive quality training that meets current standards.`,
            cta: "Ready to start your CDL journey? Visit http://alwaystruckingandloading.com today!"
        };
    }

    getPricingInfo() {
        return {
            message: `Our training programs are competitively priced with options to fit different budgets:

                • We offer flexible payment plans
                • Financing options available for qualified students
                • Special rates for veterans and company-sponsored students
                • Group discounts for companies enrolling multiple employees

                For current pricing and available promotions, please contact us directly or visit our website.`,
            cta: "Get detailed pricing information at http://alwaystruckingandloading.com!"
        };
    }

    getTrainingDurationInfo() {
        return {
            message: `Training duration varies based on the program and your learning pace:

                • Full CDL training typically takes 3-6 weeks
                • Refresher courses can be completed in 1-2 weeks
                • Dispatcher training programs run 2-4 weeks
                • Specialized courses (HOS, Defensive Driving) can be completed in 1-3 days
                
                We offer both full-time and part-time scheduling options to accommodate your needs.`,
            cta: "Find a training schedule that works for you at http://alwaystruckingandloading.com!"
        };
    }

    getLocationInfo() {
        return {
            message: `Always Trucking & Loading LLC is based in Milwaukee, WI.

                Our training facilities are equipped with modern classrooms and training equipment to provide a comprehensive learning experience.
                
                We also offer select online training options for theoretical components of our courses, making it convenient for students who may not be able to attend in-person sessions.`,
            cta: "Visit http://alwaystruckingandloading.com to see our facilities and training environment!"
        };
    }

    getInstructorInfo() {
        return {
            message: `Our lead instructor is Anthony, Owner/Instructor at Always Trucking & Loading LLC.

                • Over 15 years of experience in the trucking industry
                • Certified instructor with extensive knowledge of CDL requirements
                • Passionate about training the next generation of professional drivers
                • Committed to safety and regulatory compliance
                • Practical approach combining classroom learning with hands-on training

                Anthony's teaching methodology focuses on practical skills that employers are looking for in today's drivers.`,
            cta: "Learn from the best! Visit http://alwaystruckingandloading.com to start your training with Anthony."
        };
    }

    getRequirementsInfo() {
        return {
            message: `Requirements for our CDL training programs include:

                • Must be at least 18 years old (21+ for interstate driving)
                • Valid driver's license
                • Able to pass DOT physical examination
                • Ability to pass drug screening
                • Clean driving record (some violations may be acceptable)
                • Basic English proficiency for safety communication
                
                We recommend contacting us to discuss your specific situation if you have concerns about meeting any requirements.`,
            cta: "Check if you qualify for our training at http://alwaystruckingandloading.com!"
        };
    }

    getContactInfo() {
        return {
            message: `You can reach Always Trucking & Loading LLC through:

                • Phone: (414) 982-7034
                • Email: Anthony@alwaystruckingandloading.com
                • Website: http://alwaystruckingandloading.com
                • Location: Milwaukee, WI
                
                Our team is ready to answer your questions about our training programs and services!`,
            cta: "Contact us today to start your journey in the trucking industry!"
        };
    }

    getDefaultResponse() {
        return {
            message: `Thank you for your interest in Always Trucking & Loading LLC! 

                We offer professional CDL training and dispatcher education programs designed to help you succeed in the trucking industry. Our courses are affordable, self-paced, and compliance-ready.
                
                For specific information about our programs, scheduling, or enrollment process, I recommend visiting our website or contacting Anthony directly.`,
            cta: "Visit http://alwaystruckingandloading.com to explore our training programs and services!"
        };
    }
}

// Make agent available globally
window.agentLeonard = new AgentLeonard();

// Add event listener for questions
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the business card page
    if (document.querySelector('.business-card')) {
        // Add Leonard's chat capability if needed
        setupLeonardChat();
    }
});

function setupLeonardChat() {
    // Create chat container if it doesn't exist
    if (!document.getElementById('leonard-chat')) {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'leonard-chat';
        chatContainer.className = 'leonard-chat';
        chatContainer.innerHTML = `
            <div class="chat-header">
                <h3>Ask Leonard about Always Trucking</h3>
                <button class="toggle-chat">💬</button>
            </div>
            <div class="chat-messages">
                <div class="agent-message">
                    Welcome to Always Trucking & Loading — proudly headquartered in Milwaukee, Wisconsin. I’m Agent Lee, your AI assistant and guide.<br><br>
Let me introduce you to Anthony — a dedicated owner, instructor, and the heart behind this operation. Anthony is more than just a trucking expert; he’s a mentor committed to your growth. With years of experience on the road and in the classroom, he understands what it takes to help everyday people become skilled professionals in a vital industry.<br><br>
This site isn’t just a business card — it’s a vision. A vision for logistics, leadership, and lifelong learning. Anthony believes in pushing yourself — professionally and personally — and he built this platform to support that journey.<br><br>
Whether you're new to CDL training or looking to sharpen your skills, Always Trucking & Loading LLC is your home base. Explore our services, save this contact, and reach out today.<br><br>
Let’s roll forward — together.
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Ask about our services...">
                <button>Send</button>
            </div>
        `;
        
        // Add chat container to the page
        document.body.appendChild(chatContainer);
        
        // Add event listeners
        const toggleBtn = chatContainer.querySelector('.toggle-chat');
        const chatMessages = chatContainer.querySelector('.chat-messages');
        const inputField = chatContainer.querySelector('input');
        const sendBtn = chatContainer.querySelector('.chat-input button');
        
        // Toggle chat visibility
        toggleBtn.addEventListener('click', function() {
            chatContainer.classList.toggle('chat-open');
            if (chatContainer.classList.contains('chat-open')) {
                // Speak Agent Lee's welcome message on chat open (mobile-first)
                if (window.speechSynthesis) {
                    // Use the welcomeMessage from the agent instance
                    let welcomeText = (window.agentLeonard && window.agentLeonard.welcomeMessage) ? window.agentLeonard.welcomeMessage : "Welcome to Always Trucking & Loading!";
                    // Prevent double-speaking by cancelling any ongoing speech
                    window.speechSynthesis.cancel();
                    // Some mobile browsers require user interaction, so trigger here
                    const utter = new window.SpeechSynthesisUtterance(welcomeText.replace(/\n/g, ' '));
                    utter.rate = 1;
                    utter.pitch = 1;
                    utter.lang = 'en-US';
                    window.speechSynthesis.speak(utter);
                }
            } else {
                // Stop speech if chat is closed
                if (window.speechSynthesis) window.speechSynthesis.cancel();
            }
        });
        
        // Handle sending messages
        function sendMessage() {
            const message = inputField.value.trim();
            if (message) {
                // Add user message
                const userMsgElement = document.createElement('div');
                userMsgElement.className = 'user-message';
                userMsgElement.textContent = message;
                chatMessages.appendChild(userMsgElement);
                
                // Get response from Leonard
                const response = window.agentLeonard.processQuestion(message);
                
                // Add agent response
                const agentMsgElement = document.createElement('div');
                agentMsgElement.className = 'agent-message';
                agentMsgElement.textContent = response.message;
                
                // Add CTA if available
                if (response.cta) {
                    const ctaElement = document.createElement('div');
                    ctaElement.className = 'cta-message';
                    ctaElement.textContent = response.cta;
                    agentMsgElement.appendChild(ctaElement);
                }
                
                chatMessages.appendChild(agentMsgElement);
                
                // Clear input and scroll to bottom
                inputField.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }
        
        // Send on button click
        sendBtn.addEventListener('click', sendMessage);
        
        // Send on Enter key
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .leonard-chat {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 300px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.2);
                overflow: hidden;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                height: 400px;
                transform: translateY(calc(100% - 50px));
                transition: transform 0.3s ease;
            }
            
            .leonard-chat.chat-open {
                transform: translateY(0);
            }
            
            .chat-header {
                background-color: #2c2c2c;
                color: #d7c9a1;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
            }
            
            .chat-header h3 {
                margin: 0;
                font-size: 16px;
            }
            
            .toggle-chat {
                background: none;
                border: none;
                color: #d7c9a1;
                font-size: 20px;
                cursor: pointer;
            }
            
            .chat-messages {
                flex: 1;
                padding: 10px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .agent-message {
                align-self: flex-start;
                background-color: #d7c9a1;
                color: #2c2c2c;
                padding: 8px 12px;
                border-radius: 12px;
                margin-bottom: 8px;
                max-width: 80%;
                word-wrap: break-word;
            }
            
            .user-message {
                align-self: flex-end;
                background-color: #2c2c2c;
                color: #d7c9a1;
                padding: 8px 12px;
                border-radius: 12px;
                margin-bottom: 8px;
                max-width: 80%;
                word-wrap: break-word;
            }
            
            .cta-message {
                font-style: italic;
                margin-top: 5px;
                font-weight: bold;
                color: #2c2c2c;
            }
            
            .chat-input {
                display: flex;
                padding: 10px;
                border-top: 1px solid #eee;
            }
            
            .chat-input input {
                flex: 1;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-right: 8px;
            }
            
            .chat-input button {
                background-color: #2c2c2c;
                color: #d7c9a1;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
}
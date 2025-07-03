/**
 * FAQ System for Always Trucking & Loading LLC
 * Provides common questions and answers about trucking services
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add FAQ button to the page
    const faqButton = document.createElement('button');
    faqButton.className = 'faq-button';
    faqButton.innerHTML = '<i class="fas fa-question-circle"></i> Common Questions';
    document.body.appendChild(faqButton);

    // Create FAQ modal
    const faqModal = document.createElement('div');
    faqModal.className = 'modal';
    faqModal.id = 'faq-modal';
    
    faqModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Frequently Asked Questions</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="faq-section">
                    <div class="faq-item">
                        <div class="faq-question">What services does Always Trucking & Loading LLC offer?</div>
                        <div class="faq-answer">
                            Always Trucking & Loading LLC offers comprehensive trucking services including CDL training, 
                            dispatcher training, hours of service compliance courses, vehicle inspection training, 
                            defensive driving programs, and fleet safety management. We provide both in-person and 
                            online training options to meet diverse needs.
                            <p><a href="http://alwaystruckingandloading.com" target="_blank">Visit our website</a> to explore our full range of services.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">How long does CDL training take?</div>
                        <div class="faq-answer">
                            Our CDL training programs vary in length based on your specific needs. Full CDL training typically takes 3-6 weeks,
                            while refresher courses can be completed in 1-2 weeks. We offer both full-time and part-time scheduling options to 
                            accommodate your needs.
                            <p><a href="http://alwaystruckingandloading.com" target="_blank">Learn more about our CDL programs</a> on our website.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">How much does training cost?</div>
                        <div class="faq-answer">
                            Our training programs are competitively priced with options to fit different budgets. We offer flexible payment plans,
                            financing options for qualified students, and special rates for veterans and company-sponsored students.
                            <p>For current pricing information, <a href="http://alwaystruckingandloading.com" target="_blank">visit our website</a> or contact us directly.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">What are the requirements for CDL training?</div>
                        <div class="faq-answer">
                            Requirements for our CDL training programs include:
                            <ul>
                                <li>Must be at least 18 years old (21+ for interstate driving)</li>
                                <li>Valid driver's license</li>
                                <li>Ability to pass DOT physical examination</li>
                                <li>Pass drug screening</li>
                                <li>Relatively clean driving record</li>
                                <li>Basic English proficiency for safety communication</li>
                            </ul>
                            <p>We recommend <a href="http://alwaystruckingandloading.com" target="_blank">contacting us</a> to discuss your specific situation.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">Who is the instructor?</div>
                        <div class="faq-answer">
                            Our lead instructor is Anthony, Owner/Instructor at Always Trucking & Loading LLC. He brings over 15 years 
                            of experience in the trucking industry and is a certified instructor with extensive knowledge of CDL requirements.
                            His teaching methodology focuses on practical skills that employers are looking for in today's drivers.
                            <p><a href="http://alwaystruckingandloading.com" target="_blank">Learn more about our instructors</a> on our website.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">Where are you located?</div>
                        <div class="faq-answer">
                            Always Trucking & Loading LLC is based in Milwaukee, WI. Our training facilities are equipped with modern 
                            classrooms and training equipment to provide a comprehensive learning experience. We also offer select online 
                            training options for theoretical components of our courses.
                            <p><a href="http://alwaystruckingandloading.com" target="_blank">Visit our website</a> for more location details.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">How do I contact Always Trucking & Loading LLC?</div>
                        <div class="faq-answer">
                            You can reach Always Trucking & Loading LLC through:
                            <ul>
                                <li>Phone: (414) 982-7034</li>
                                <li>Email: Anthony@alwaystruckingandloading.com</li>
                                <li>Website: <a href="http://alwaystruckingandloading.com" target="_blank">alwaystruckingandloading.com</a></li>
                                <li>Location: Milwaukee, WI</li>
                            </ul>
                            <p>Our team is ready to answer your questions about our training programs and services!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(faqModal);
    
    // Event listeners
    faqButton.addEventListener('click', function() {
        faqModal.style.display = 'flex';
    });
    
    const closeBtn = faqModal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        faqModal.style.display = 'none';
    });
    
    // Close modal if clicking outside content
    faqModal.addEventListener('click', function(event) {
        if (event.target === faqModal) {
            faqModal.style.display = 'none';
        }
    });
    
    // Toggle FAQ answers
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
});
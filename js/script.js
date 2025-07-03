// Business Card Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const saveContactBtn = document.getElementById('save-contact');
  const showAgentBtn = document.getElementById('show-agent');
  const agentWrapper = document.getElementById('agent-wrapper');
  const closeAgentBtn = document.getElementById('close-agent');
  const faqQuestions = document.querySelectorAll('.faq-question');
  const agentNavBtns = document.querySelectorAll('.agent-nav-btn');
  const businessCard = document.querySelector('.business-card');
  
  // Ensure card displays properly on different devices
  function adjustCardDisplay() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate the proper image dimensions based on the viewport
    if (windowWidth <= 767) {
      // Mobile display
      businessCard.style.width = '100%';
      businessCard.style.height = '100vh';
      businessCard.style.backgroundSize = 'contain';
      businessCard.style.backgroundRepeat = 'no-repeat';
      businessCard.style.backgroundPosition = 'center';
    } else {
      // Desktop display
      const imageAspectRatio = 0.5625; // 9:16 aspect ratio
      
      // Set height to 90% of viewport height
      const desiredHeight = windowHeight * 0.9;
      
      // Calculate width based on aspect ratio
      const desiredWidth = desiredHeight * imageAspectRatio;
      
      // Set dimensions
      businessCard.style.height = `${desiredHeight}px`;
      businessCard.style.width = `${desiredWidth}px`;
      businessCard.style.backgroundSize = 'contain';
      businessCard.style.backgroundRepeat = 'no-repeat';
      businessCard.style.backgroundPosition = 'center';
    }
  }
  
  // Run on load and resize
  adjustCardDisplay();
  window.addEventListener('resize', adjustCardDisplay);
  
  // Save Contact functionality
  saveContactBtn.addEventListener('click', function() {
    const contact = {
      name: "Antonio",
      phoneNumbers: [
        { type: "work", number: "1-800-362-6564" },
        { type: "mobile", number: "414-982-7034" }
      ],
      email: "Antonio@alwaystruckinandloading.com"
    };
    
    // Create vCard format
    const vcard = createVCard(contact);
    
    // Create download
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = "antonio_contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  // Show Agent Lee functionality
  showAgentBtn.addEventListener('click', function() {
    agentWrapper.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  });
  
  // Close Agent Lee when clicking the close button
  closeAgentBtn.addEventListener('click', function() {
    agentWrapper.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });
  
  // Toggle FAQ answers when clicking on questions
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      // Toggle active class on the question
      this.classList.toggle('active');
      
      // Get the answer element (next sibling)
      const answer = this.nextElementSibling;
      
      // Toggle show class on the answer
      answer.classList.toggle('show');
    });
  });
  
  // Agent navigation buttons
  agentNavBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      
      // Find all FAQ items related to this section
      let sectionFAQs = [];
      
      switch(section) {
        case 'services':
          sectionFAQs = ['What services does Always Trucking and Loading offer?', 
                         'Do you handle time-sensitive deliveries?',
                         'What makes Always Trucking and Loading different from competitors?'];
          break;
        case 'locations':
          sectionFAQs = ['What areas do you serve?'];
          break;
        case 'fleet':
          sectionFAQs = ['What types of trucks are in your fleet?',
                         'How do you handle specialized or oversized cargo?'];
          break;
        case 'contact':
          sectionFAQs = ['How can I get a quote for transportation services?',
                         'Are you licensed and insured?'];
          break;
      }
      
      // Highlight matching FAQs
      faqQuestions.forEach(question => {
        const questionText = question.textContent;
        const answer = question.nextElementSibling;
        
        if (sectionFAQs.some(faq => questionText.includes(faq))) {
          // Open and highlight these FAQs
          question.classList.add('active');
          answer.classList.add('show');
          
          // Scroll to first matching FAQ
          if (questionText.includes(sectionFAQs[0])) {
            question.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          // Close other FAQs
          question.classList.remove('active');
          answer.classList.remove('show');
        }
      });
    });
  });
  
  // Make sure the agent wrapper starts hidden
  agentWrapper.style.display = 'none';
});

// Function to create vCard format
function createVCard(contact) {
  let vcard = "BEGIN:VCARD\n";
  vcard += "VERSION:3.0\n";
  vcard += `FN:${contact.name}\n`;
  vcard += `N:${contact.name};;;\n`;
  
  contact.phoneNumbers.forEach(phone => {
    vcard += `TEL;TYPE=${phone.type.toUpperCase()}:${phone.number}\n`;
  });
  
  vcard += `EMAIL:${contact.email}\n`;
  vcard += `URL:https://alwaystruckingandloading.com\n`;
  vcard += `ORG:Always Trucking and Loading LLC\n`;
  vcard += "END:VCARD";
  
  return vcard;
}
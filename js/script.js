// Function to share the business card
function shareCard() {
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: 'Antonio - Always Trucking & Loading LLC',
            text: 'Contact information for Antonio, Owner/Instructor at Always Trucking & Loading LLC',
            url: 'http://alwaystruckingandloading.com'
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        alert('Copy this link to share: ' + window.location.href);
    }
}

// Function to download vCard
function downloadVCard() {
    // Create vCard content
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Antonio
TITLE:Owner/Instructor
ORG:Always Trucking & Loading LLC
TEL;TYPE=WORK,VOICE:(414) 239-9333
TEL;TYPE=WORK,VOICE:(414) 982-7034
EMAIL:Antonio@alwaystruckingandloading.com
URL:http://alwaystruckingandloading.com
ADR;TYPE=WORK:;;Milwaukee;WI;;;
END:VCARD`;

    // Create a blob and download link
    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'antonio_contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Function to toggle QR Code visibility
function toggleQRCode() {
    const overlay = document.getElementById('qr-overlay');
    const qrContainer = document.getElementById('qrcode');
    
    if (overlay.classList.contains('hidden')) {
        // Show QR code
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.add('visible');
        }, 10);
        
        // Generate QR code if it doesn't exist
        if (qrContainer.innerHTML === '') {
            generateQRCode();
        }
    } else {
        // Hide QR code
        overlay.classList.remove('visible');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
}

// Function to generate QR Code
function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    
    // Clear any existing content
    qrContainer.innerHTML = '';
    
    // Create vCard data for QR code
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Antonio
TITLE:Owner/Instructor
ORG:Always Trucking & Loading LLC
TEL;TYPE=WORK,VOICE:(414) 239-9333
TEL;TYPE=WORK,VOICE:(414) 982-7034
EMAIL:Antonio@alwaystruckingandloading.com
URL:http://alwaystruckingandloading.com
ADR;TYPE=WORK:;;Milwaukee;WI;;;
END:VCARD`;
    
    // Generate QR code
    if (window.QRCode) {
        new QRCode(qrContainer, {
            text: vCardData,
            width: 200,
            height: 200,
            colorDark: "#2c2c2c",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        qrContainer.innerHTML = '<p>QR Code generator failed to load</p>';
    }
}

// Add animations on load
document.addEventListener('DOMContentLoaded', function() {
    // Animate card entrance
    const card = document.querySelector('.card-front');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 200);
    
    // Stagger animate contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });
    
    // Animate social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 900 + (index * 100));
    });
    
    // Animate service badges
    const serviceBadges = document.querySelectorAll('.service-badge');
    serviceBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(-5px)';
        
        setTimeout(() => {
            badge.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});
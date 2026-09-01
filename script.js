// ===== BASITOTOMASYON - MAIN SCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initChatbot();
    initContactForm();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stagger children if needed
                    const children = entry.target.querySelectorAll('.reveal-child');
                    children.forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.12}s`;
                        child.classList.add('visible');
                    });
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.textContent;

        btn.textContent = 'Gönderiliyor...';
        btn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            btn.textContent = '✓ Gönderildi!';
            btn.style.background = 'linear-gradient(135deg, #00cec9, #55efc4)';

            setTimeout(() => {
                form.reset();
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 2500);
        }, 1200);
    });
}

// ===== CHATBOT =====
function initChatbot() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatClose');
    const sendBtn = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');

    let isOpen = false;
    let hasGreeted = false;

    // Bot responses database
    const botResponses = {
        'hizmetleriniz neler?': {
            text: 'Başlıca hizmetlerimiz:\n\n🔗 **API Entegrasyonları** — CRM, ERP, e-ticaret ve üçüncü parti sistemleri birbirine bağlıyoruz.\n\n🤖 **AI Destekli İş Akışları** — GPT, Claude ve diğer yapay zeka modellerini iş süreçlerinize entegre ediyoruz.\n\n📊 **Veri & Raporlama Otomasyonu** — Tekrarlayan raporlama süreçlerini tamamen otomatik hale getiriyoruz.\n\n🔄 **n8n & Webhook Otomasyonları** — Düşük kodlu otomasyon altyapıları kuruyoruz.',
            quickReplies: ['Fiyatlandırma nasıl?', 'Bir otomasyon projem var']
        },
        'fiyatlandırma nasıl?': {
            text: 'Fiyatlandırmamız projenin kapsamına göre belirlenir:\n\n💡 **Başlangıç Paketi** — Tekil otomasyon akışları (basit API bağlantıları, bildirim sistemleri)\n\n🚀 **Profesyonel Paket** — Çoklu entegrasyon, AI destekli iş akışları, özel dashboard\n\n🏢 **Kurumsal Paket** — Uçtan uca otomasyon altyapısı, 7/24 destek, bakım\n\nÜcretsiz analiz toplantısı için iletişim formunu doldurabilirsiniz!',
            quickReplies: ['Hizmetleriniz neler?', 'Bir otomasyon projem var']
        },
        'bir otomasyon projem var': {
            text: 'Harika! Projenizi değerlendirmek için birkaç bilgiye ihtiyacım var:\n\n1️⃣ Hangi iş sürecini otomatikleştirmek istiyorsunuz?\n2️⃣ Şu an hangi araçları/yazılımları kullanıyorsunuz?\n3️⃣ Tahmini bütçeniz ve zaman çizelgeniz nedir?\n\nBu bilgileri aşağıdaki iletişim formumuza yazabilir veya doğrudan bize e-posta gönderebilirsiniz:\n📧 info@basitotomasyon.com',
            quickReplies: ['Hizmetleriniz neler?', 'Fiyatlandırma nasıl?']
        },
        'n8n nedir?': {
            text: 'n8n, açık kaynaklı bir iş akışı otomasyon platformudur. 🔧\n\nAvantajları:\n• 400+ hazır entegrasyon konektörü\n• Görsel sürükle-bırak editör\n• Self-hosted veya cloud seçeneği\n• Düşük kod / no-code yaklaşımı\n\nBiz n8n\'i müşterilerimiz için özelleştirerek, kurumsal iş süreçlerini otomatize ediyoruz.',
            quickReplies: ['Hizmetleriniz neler?', 'Bir otomasyon projem var']
        },
        'hangi teknolojileri kullanıyorsunuz?': {
            text: 'Çalıştığımız başlıca teknolojiler:\n\n⚡ **Otomasyon:** n8n, Make (Integromat), Zapier\n🧠 **AI/ML:** OpenAI GPT, Claude, Custom LLMs\n💻 **Backend:** Node.js, Python, REST/GraphQL API\n🗃️ **Veritabanı:** PostgreSQL, MongoDB, Supabase\n☁️ **Cloud:** AWS, Google Cloud, Vercel\n\nProjenize en uygun teknoloji seçimini birlikte yapabiliriz!',
            quickReplies: ['Fiyatlandırma nasıl?', 'Bir otomasyon projem var']
        }
    };

    // Fallback responses
    const fallbackResponses = [
        'İlginç bir soru! Bu konuda size daha detaylı bilgi verebilmemiz için iletişim formumuzu doldurun veya info@basitotomasyon.com adresine yazın. 📧',
        'Bu konuyu daha iyi anlamak için 15 dakikalık ücretsiz bir keşif görüşmesi yapabiliriz. İletişim bölümünden bize ulaşabilirsiniz! 🤝',
        'Güzel soru! Her projeyi özel olarak değerlendiriyoruz. Detaylı bilgi için aşağıdaki iletişim formunu kullanabilirsiniz. ✨'
    ];

    // Toggle chat window
    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        chatWindow.classList.toggle('open', isOpen);
        toggleBtn.querySelector('.icon-chat').textContent = isOpen ? '✕' : '💬';

        // Remove badge
        const badge = toggleBtn.querySelector('.badge');
        if (badge) badge.remove();

        // Show greeting on first open
        if (isOpen && !hasGreeted) {
            hasGreeted = true;
            setTimeout(() => {
                addBotMessage('Merhaba! 👋 Ben BasitOtomasyon asistanıyım. Otomasyon ihtiyaçlarınız için size nasıl yardımcı olabilirim?', [
                    'Hizmetleriniz neler?',
                    'Fiyatlandırma nasıl?',
                    'Bir otomasyon projem var'
                ]);
            }, 500);
        }

        if (isOpen) {
            setTimeout(() => chatInput.focus(), 300);
        }
    });

    // Close button
    closeBtn.addEventListener('click', () => {
        isOpen = false;
        chatWindow.classList.remove('open');
        toggleBtn.querySelector('.icon-chat').textContent = '💬';
    });

    // Send message
    sendBtn.addEventListener('click', () => sendMessage());
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        chatInput.value = '';

        // Show typing indicator
        showTyping();

        // Simulate response delay
        const delay = 800 + Math.random() * 1200;
        setTimeout(() => {
            removeTyping();
            generateResponse(text);
        }, delay);
    }

    function generateResponse(userText) {
        const normalizedText = userText.toLowerCase().trim().replace(/[?!.,]/g, '');

        // Check for exact or partial matches
        let matched = null;
        for (const [key, value] of Object.entries(botResponses)) {
            const normalizedKey = key.toLowerCase().replace(/[?!.,]/g, '');
            if (normalizedText.includes(normalizedKey) || normalizedKey.includes(normalizedText)) {
                matched = value;
                break;
            }
        }

        // Keyword matching
        if (!matched) {
            if (normalizedText.includes('hizmet') || normalizedText.includes('servis') || normalizedText.includes('ne yapıyorsunuz')) {
                matched = botResponses['hizmetleriniz neler?'];
            } else if (normalizedText.includes('fiyat') || normalizedText.includes('ücret') || normalizedText.includes('maliyet') || normalizedText.includes('para')) {
                matched = botResponses['fiyatlandırma nasıl?'];
            } else if (normalizedText.includes('proje') || normalizedText.includes('otomasyon') || normalizedText.includes('ihtiyac')) {
                matched = botResponses['bir otomasyon projem var'];
            } else if (normalizedText.includes('n8n') || normalizedText.includes('make') || normalizedText.includes('zapier')) {
                matched = botResponses['n8n nedir?'];
            } else if (normalizedText.includes('teknoloji') || normalizedText.includes('araç') || normalizedText.includes('stack')) {
                matched = botResponses['hangi teknolojileri kullanıyorsunuz?'];
            } else if (normalizedText.includes('merhaba') || normalizedText.includes('selam') || normalizedText.includes('hey')) {
                matched = {
                    text: 'Merhaba! 😊 Size nasıl yardımcı olabilirim?',
                    quickReplies: ['Hizmetleriniz neler?', 'Fiyatlandırma nasıl?', 'Bir otomasyon projem var']
                };
            } else if (normalizedText.includes('teşekkür') || normalizedText.includes('sağol') || normalizedText.includes('sağ ol')) {
                matched = {
                    text: 'Rica ederim! 🙏 Başka bir sorunuz olursa buradayım. İyi günler dilerim!',
                    quickReplies: ['Hizmetleriniz neler?', 'Bir otomasyon projem var']
                };
            }
        }

        if (matched) {
            addBotMessage(matched.text, matched.quickReplies);
        } else {
            const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            addBotMessage(fallback, ['Hizmetleriniz neler?', 'Fiyatlandırma nasıl?', 'Bir otomasyon projem var']);
        }
    }

    function addUserMessage(text) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble user';
        bubble.textContent = text;
        messagesContainer.appendChild(bubble);
        scrollToBottom();
    }

    function addBotMessage(text, quickReplies = []) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble bot';

        // Parse markdown-like bold text
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        bubble.innerHTML = formattedText;
        messagesContainer.appendChild(bubble);

        // Add quick replies
        if (quickReplies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.className = 'quick-replies';

            quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = reply;
                btn.addEventListener('click', () => {
                    addUserMessage(reply);
                    repliesContainer.remove();
                    showTyping();
                    const delay = 600 + Math.random() * 800;
                    setTimeout(() => {
                        removeTyping();
                        generateResponse(reply);
                    }, delay);
                });
                repliesContainer.appendChild(btn);
            });

            messagesContainer.appendChild(repliesContainer);
        }

        scrollToBottom();
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typing);
        scrollToBottom();
    }

    function removeTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }
}

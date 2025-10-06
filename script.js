// THE ULTIMATE CM CONSOLE MASTERPIECE 🎨
console.clear();

// 1. Welcome Animation
console.log('%c🎊 INITIALIZING CM CONSOLE EXPERIENCE... 🎊', 
    'color: #ff6b6b; font-size: 16px; font-weight: bold; text-align: center;'
);

setTimeout(() => {
    console.clear();
    
    // 2. Main CM Logo with Box Drawing
    console.log(`%c
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ██████╗ ███╗   ███╗    ██████╗ ███████╗██╗   ██╗  ███████╗ ║
║  ██╔════╝ ████╗ ████║    ██╔══██╗██╔════╝██║   ██║  ██╔════╝ ║
║  ██║      ██╔████╔██║    ██║  ██║█████╗  ██║   ██║  ███████╗ ║
║  ██║      ██║╚██╔╝██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝  ╚════██║ ║
║  ╚██████╗ ██║ ╚═╝ ██║    ██████╔╝███████╗ ╚████╔╝   ███████║ ║
║   ╚═════╝ ╚═╝     ╚═╝    ╚═════╝ ╚══════╝  ╚═══╝    ╚══════╝ ║
║                                                              ║
║                 🌟 WELCOME TO MY DIGITAL REALM 🌟            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`, 
    'color: #4ecdc4; font-family: monospace; font-size: 12px; line-height: 1.2;'
    );
    
    // 3. Colorful Welcome Message
    console.log('%c✨ CREATIVE DEVELOPER CONSOLE ✨', 
        'background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24); color: white; padding: 10px 20px; border-radius: 20px; font-size: 18px; font-weight: bold;'
    );
    
    // 4. Professional Info Cards
    setTimeout(() => {
        console.log('%c┌─────────────────────────────────────────┐', 'color: #45b7d1; font-family: monospace;');
        console.log('%c│  👨‍💻 DEVELOPER INFO                                  │', 'color: #45b7d1; font-family: monospace;');
        console.log('%c├─────────────────────────────────────────┤', 'color: #45b7d1; font-family: monospace;');
        console.log('%c│  💼 Portfolio: https://comrademohan.rf.gd/          │', 'color: #45b7d1; font-family: monospace;');
        console.log('%c│  📧 Email: madhiremohanreddy@gmail.com              │', 'color: #45b7d1; font-family: monospace;');
        console.log('%c│  🐙 GitHub: https://github.com/ComradeMohan         │', 'color: #45b7d1; font-family: monospace;');
        console.log('%c│  💼 LinkedIn: https://www.linkedin.com/in/mmohanreddy│', 'color: #45b7d1; font-family: monospace;');
        console.log('%c└─────────────────────────────────────────┘', 'color: #45b7d1; font-family: monospace;');
    }, 500);
    
    // 5. Interactive Commands Setup
    setTimeout(() => {
        console.log('%c🎮 INTERACTIVE COMMANDS LOADED:', 'color: #f9ca24; font-size: 16px; font-weight: bold;');
        console.log('%c• CM.about() - Learn about me', 'color: #4ecdc4; font-size: 14px;');
        console.log('%c• CM.skills() - View my tech stack', 'color: #4ecdc4; font-size: 14px;');
        console.log('%c• CM.projects() - See my latest work', 'color: #4ecdc4; font-size: 14px;');
        console.log('%c• CM.contact() - Get in touch', 'color: #4ecdc4; font-size: 14px;');
        console.log('%c• CM.surprise() - Mystery command 🎉', 'color: #ff6b6b; font-size: 14px;');
        
        // 6. Setup Interactive Commands
        window.CM = {
            about: () => {
                console.log(`%c
        ╭──────────────────────────────────────────────────╮
        │                   ABOUT CM                       │
        ├──────────────────────────────────────────────────┤
        │  🚀 Full-Stack Developer                         │
        │  🎨 UI/UX Designer                               │
        │  ☕ Coffee Enthusiast                            │
        │  🌍 Making the web beautiful, one site at a time │
        ╰──────────────────────────────────────────────────╯
        `, 'color: #ff6b6b; font-family: monospace; font-size: 12px;');
            },
            
            skills: () => {
                const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS3', 'HTML5', 'MongoDB', 'Express'];
                console.log('%c🔧 TECH STACK:', 'color: #4ecdc4; font-size: 16px; font-weight: bold;');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        console.log(`%c▶ ${skill}`, `color: hsl(${index * 45}, 70%, 60%); font-size: 14px; font-weight: bold;`);
                    }, index * 200);
                });
            },
            
            projects: () => {
                console.log(`%c
        🏆 FEATURED PROJECTS:
        ═══════════════════
        🌐 Saveetha Hub - React & Node.js
        📱 Mobile App UniVault - Kotlin with PHP  
        🎮 Campus Codex  - NextJs
        `, 'color: #45b7d1; font-size: 14px; line-height: 1.5;');
            },
            
            contact: () => {
                console.log(`%c
        ╔═══════════════════════════════════════╗
        ║            📞 CONTACT INFO            ║
        ╠═══════════════════════════════════════╣
        ║  📧 madhiremohanreddy@gmail.com           ║
        ║  🌐 https://comrademohan.rf.gd/         ║
        ║  📱 +91 6281359314               ║
        ║  📍 Available for remote work        ║
        ╚═══════════════════════════════════════╝
        `, 'color: #f9ca24; font-family: monospace; font-size: 12px;');
            },
            
            surprise: () => {
                const messages = [
                    '🎉 You found the Easter egg!',
                    '🦄 Unicorns are real in code!',
                    '🍕 Pizza makes code better!',
                    '🎸 I code to rock music!',
                    '🌙 I sometimes code at 3 AM!'
                ];
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'];
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                console.log(`%c${randomMsg}`, `color: ${randomColor}; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);`);
                
                // ASCII Art Surprise
                setTimeout(() => {
                    console.log(`%c
            ╔═══════════════════════════════════╗
            ║   🎭 SURPRISE ASCII ART! 🎭      ║
            ╠═══════════════════════════════════╣
            ║      /\\_/\\                        ║
            ║     ( o.o )                       ║
            ║      > ^ <   CM SAYS HELLO!       ║
            ╚═══════════════════════════════════╝
            `, 'color: #ff9ff3; font-family: monospace; font-size: 12px;');
                }, 500);
            }
        };
    }, 1000);
    
    // 7. Fun Footer
    setTimeout(() => {
        console.log('\n');
        console.log('%c🎯 PRO TIP: Type "CM." and press Tab to see all available commands!', 
            'background: #2c3e50; color: #ecf0f1; padding: 8px 15px; border-radius: 15px; font-size: 13px;'
        );
        console.log('%c💡 Enjoying this console experience? Let\'s build something amazing together!', 
            'color: #e74c3c; font-size: 14px; font-style: italic;'
        );
        console.log('%c────────────────────────────────────────────────────────────────', 'color: #34495e;');
    }, 1500);
    
}, 1000);

function showSidebar(event) {
    event.preventDefault();
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar(event) {
    event.preventDefault();
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
} 
var icon=document.getElementById("togglemobile");
icon.onclick = function(){
    document.body.classList.toggle('light-theme');
    let theme = 'light-mode';
    if (document.body.classList.contains('light-theme')) {
        theme = 'dark-mode';
        icon.textContent = '🌞';
    } else {
        icon.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
}

const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.textContent = '🌙';
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    let theme = 'light-mode';
    if (document.body.classList.contains('light-theme')) {
        theme = 'dark-mode';
        themeToggleBtn.textContent = '🌞';
    } else {
        themeToggleBtn.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
});
window.onload = () => {
    const sections = document.querySelectorAll('section[id]');
    const navlinksSidebar = document.querySelectorAll('.sidebar li a');
    const navlinksHeader = document.querySelectorAll('.header-bar li a');
    function hideSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    }
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 200;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navlinksSidebar.forEach(link => {
                    link.classList.remove('active');
                });
                navlinksHeader.forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector('.sidebar li a[href="#' + id + '"]').classList.add('active');
                document.querySelector('.header-bar li a[href="#' + id + '"]').classList.add('active');
            }
        });
    };

    // Add event listener to each sidebar link to hide the sidebar when clicked
    navlinksSidebar.forEach(link => {
        link.addEventListener('click', () => {
            hideSidebar();
        });
    });

    // Add event listener to each header link
    navlinksHeader.forEach(link => {
        link.addEventListener('click', () => {
            navlinksSidebar.forEach(navlink => {
                navlink.classList.remove('active');
            });
            navlinksHeader.forEach(headerLink => {
                headerLink.classList.remove('active');
            });
            link.classList.add('active');
        });
    });
};


gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 3.5,
    }
  );
  gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );


document.addEventListener("DOMContentLoaded", function() {
    var animatedElements = document.querySelectorAll('.animate-on-scroll');

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function onScroll() {
        animatedElements.forEach(function(el) {
            if (isElementInViewport(el)) {
                el.classList.add('animate');
            } else {
                el.classList.remove('animate'); // Remove animation class if element is out of view
            }
        });
    }

    window.addEventListener('scroll', onScroll);

    // Trigger the animation on page load
    onScroll();
});



    
 /*portfolio-filter---------------------------------*/
 $(document).ready(function(){
        $('.list').click(function(){
            const value = $(this).attr('data-filter');
            if(value == 'all'){
                $('.portfolio-box').show('1000');
            }
            else{
                $('.portfolio-box').not('.'+value).hide('1000');
                $('.portfolio-box').filter('.'+value).show('1000');
            }
        });
    });

const lazyImages = document.querySelectorAll('.lazy-image');

lazyImages.forEach(image => {
  image.addEventListener('load', () => {
    image.classList.remove('blurry-image'); // Remove blurry class once loaded
  });
});
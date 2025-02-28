'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener('click', function() {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;
    });
}
  
  

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        for(let j = 0; j < pages.length; j++) {
            if(this.innerHTML.toLowerCase() == pages[j].dataset.page) {
                pages[j].classList.add('active');
                navigationLinks[j].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove('active');
                navigationLinks[j].classList.remove('active');
            }
        }
    });
}

// Theme switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Remove any saved theme and set to dark by default
    localStorage.removeItem('theme');
    htmlElement.setAttribute('data-theme', 'dark');
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const musicToggle = document.getElementById('music-toggle');
    let player;
    let isPlaying = false;

    // Load YouTube IFrame API
    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube Player with security parameters
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-audio', {
            height: '0',
            width: '0',
            videoId: 'CfPxlb8-ZQ0',
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'playsinline': 1,
                'origin': window.location.origin,
                'enablejsapi': 1,
                'widget_referrer': window.location.href
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError
            }
        });
    };

    function onPlayerReady(event) {
        musicToggle.addEventListener('click', () => {
            try {
                if (isPlaying) {
                    player.pauseVideo();
                    musicToggle.classList.remove('playing');
                } else {
                    player.playVideo();
                    musicToggle.classList.add('playing');
                }
                isPlaying = !isPlaying;
            } catch (error) {
                console.error("Player interaction failed:", error);
            }
        });
    }

    function onPlayerError(event) {
        console.error("YouTube Player Error:", event.data);
        // Fallback to alternate video or show error message
    }

    // Load YouTube API
    loadYouTubeAPI();
});


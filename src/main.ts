import Lenis from 'lenis';
import './style.css'
import closeIcon from "/images/icon-close.svg";
import openIcon from "/images/icon-hamburger.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"


document.addEventListener("DOMContentLoaded", () => {

    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    window.addEventListener("resize", () => {
        if (Math.floor(window.innerWidth) >= 910) {
            mobileNav.classList.remove("active")
            mobileNav.classList.add("inactive");
            menuButton.querySelector("img")!.src = openIcon;

            lenis.start();

            navLeave();
        }
    })

    let previousScrollY = 0;
    window.addEventListener("scroll", () => {
        const body = document.body;

        if (window.scrollY === 0) {
            if (body.classList.contains("page-up")) {
                body.classList.remove("page-up");
            }

            return;
        }

        if (previousScrollY > window.scrollY) {
            if (!body.classList.contains("page-up")) {
                body.classList.add("page-up");
            }

            if (body.classList.contains("page-down")) {
                document.body.classList.remove("page-down");
            }
        } else {
            if (!body.classList.contains("page-down")) {
                body.classList.add("page-down");
            }

            if (body.classList.contains("page-up")) {
                document.body.classList.remove("page-up");
            }
        }

        previousScrollY = window.scrollY
    })
    
    const mobileNav = document.querySelector(".mobile-nav") as HTMLElement;
    const mobileNavContainer = document.querySelector(".mobile-nav-container") as HTMLElement;
    const menuButton = document.querySelector("[menu-button]") as HTMLButtonElement;


    menuButton.addEventListener("click", () => {
        const buttonImg = menuButton.querySelector("img") as HTMLImageElement;

        if (mobileNav.classList.contains("inactive")) {
            mobileNav.classList.remove("inactive");
            mobileNav.classList.add("active");

            buttonImg.src = closeIcon;
            lenis.stop();

            mobileNavContainer.style.visibility = "visible";
            navEnter();
            return;
        }

        if (mobileNav.classList.contains("active")) {
            mobileNav.classList.remove("active");
            mobileNav.classList.add("inactive");
            
            buttonImg.src = openIcon;
            navLeave();
            lenis.start();
            return;
        }
    })



    function navEnter(): void {
        const tl = gsap.timeline();

        tl.addLabel("start")
        .to(
            mobileNav, 
            {
            opacity: 1
        }, "start")
        .to(mobileNavContainer, {
            opacity: 1
        }, "start")
    }


    function navLeave(): void {
        const tl = gsap.timeline();
        tl.addLabel("start")
        .to(mobileNav, {
            opacity: 0,
            onComplete: () => {
                mobileNavContainer.style.visibility = "hidden";
            }
        }, "start")
        .to(mobileNavContainer, {
            opacity: 0
        }, "start")
    }
    
})
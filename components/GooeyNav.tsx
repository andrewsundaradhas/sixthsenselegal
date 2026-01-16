'use client'

import { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

interface NavItem {
    label: string;
    href: string;
}

interface GooeyNavProps {
    items: NavItem[];
    animationTime?: number;
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    timeVariance?: number;
    colors?: number[];
    initialActiveIndex?: number;
}

const GooeyNav = ({
    items,
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    initialActiveIndex = 0
}: GooeyNavProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const filterRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [isOpen, setIsOpen] = useState(false);

    const noise = (n = 1) => n / 2 - Math.random() * n;

    const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const createParticle = (i: number, t: number, d: [number, number], r: number) => {
        let rotate = noise(r / 10);
        return {
            start: getXY(d[0], particleCount - i, particleCount),
            end: getXY(d[1] + noise(7), particleCount - i, particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
        };
    };

    const makeParticles = (element: HTMLElement) => {
        const d = particleDistances;
        const r = particleR;
        const bubbleTime = animationTime * 2 + timeVariance;
        element.style.setProperty('--time', `${bubbleTime}ms`);

        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            const p = createParticle(i, t, d, r);
            element.classList.remove('active');

            setTimeout(() => {
                const particle = document.createElement('span');
                const point = document.createElement('span');
                particle.classList.add('particle');
                particle.style.setProperty('--start-x', `${p.start[0]}px`);
                particle.style.setProperty('--start-y', `${p.start[1]}px`);
                particle.style.setProperty('--end-x', `${p.end[0]}px`);
                particle.style.setProperty('--end-y', `${p.end[1]}px`);
                particle.style.setProperty('--time', `${p.time}ms`);
                particle.style.setProperty('--scale', `${p.scale}`);
                particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
                particle.style.setProperty('--rotate', `${p.rotate}deg`);

                point.classList.add('point');
                particle.appendChild(point);
                element.appendChild(particle);
                requestAnimationFrame(() => {
                    element.classList.add('active');
                });
                setTimeout(() => {
                    try {
                        element.removeChild(particle);
                    } catch {
                        // Do nothing
                    }
                }, t);
            }, 30);
        }
    };

    const updateEffectPosition = (element: HTMLElement) => {
        if (!containerRef.current || !filterRef.current || !textRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = element.getBoundingClientRect();

        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`
        };
        Object.assign(filterRef.current.style, styles);
        Object.assign(textRef.current.style, styles);
        textRef.current.innerText = element.innerText;
    };

    const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
        const liEl = e.currentTarget;
        if (activeIndex === index) {
            setIsOpen(false);
            return;
        }

        setActiveIndex(index);
        updateEffectPosition(liEl);
        setIsOpen(false);

        if (filterRef.current) {
            const particles = filterRef.current.querySelectorAll('.particle');
            particles.forEach(p => filterRef.current!.removeChild(p));
        }

        if (textRef.current) {
            textRef.current.classList.remove('active');

            void textRef.current.offsetWidth;
            textRef.current.classList.add('active');
        }

        if (filterRef.current) {
            makeParticles(filterRef.current);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const liEl = e.currentTarget.parentElement;
            if (liEl) {
                handleClick({ currentTarget: liEl } as React.MouseEvent<HTMLLIElement>, index);
            }
        }
    };

    useEffect(() => {
        if (!navRef.current || !containerRef.current) return;

        // Add specific handling for mobile open/close to recalculate positions
        if (isOpen) {
            setTimeout(() => {
                const activeLi = navRef.current?.querySelectorAll('li')[activeIndex];
                if (activeLi) updateEffectPosition(activeLi as HTMLElement);
            }, 300); // Wait for transition
        }

        const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
        if (activeLi) {
            updateEffectPosition(activeLi as HTMLElement);
            textRef.current?.classList.add('active');
        }

        const resizeObserver = new ResizeObserver(() => {
            const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
            if (currentActiveLi) {
                updateEffectPosition(currentActiveLi as HTMLElement);
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [activeIndex, isOpen]);

    return (
        <>
            <button
                className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 sm:p-3 bg-black/80 backdrop-blur-md border border-red-600/30 rounded-md text-white hover:bg-black/90 hover:border-red-600/50 transition-all duration-200 shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                )}
            </button>
            <div
                className={`gooey-nav-container ${isOpen ? 'mobile-open' : ''}`}
                ref={containerRef}
            >
                <div className="gooey-nav-logo">
                    <a href="/">
                        <img
                            src="/images/logo.png"
                            alt="SIXTH SENSE LEGAL"
                            className="w-auto mx-auto"
                            onError={(e) => {
                                console.error("Logo failed to load")
                                e.currentTarget.src =
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20152522-jjpwpyWNl7X2ScR1n6iOQeSJLteReI.png"
                            }}
                        />
                        <p className="font-panara text-xs text-white mt-1.5 text-center px-2">Making Law Make Sense</p>
                    </a>
                </div>
                <nav>
                    <ul ref={navRef}>
                        {items.map((item, index) => (
                            <li key={index} className={activeIndex === index ? 'active' : ''} onClick={e => handleClick(e, index)}>
                                <a href={item.href} onKeyDown={e => handleKeyDown(e, index)}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="gooey-nav-footer">
                    <p className="text-xs text-muted-foreground text-center px-4">© {new Date().getFullYear()} SIXTH SENSE LEGAL</p>
                </div>
                <span className="effect filter" ref={filterRef} />
                <span className="effect text" ref={textRef} />
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[40] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default GooeyNav;

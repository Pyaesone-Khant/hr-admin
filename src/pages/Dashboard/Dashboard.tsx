import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

export function Dashboard() {

    const container = useRef(null);
    const container2 = useRef(null)
    const boxesRef = useRef<HTMLDivElement[]>([]);
    const squaresRef = useRef<HTMLDivElement[]>([]);

    const container3 = useRef(null);

    useGSAP(() => {
        gsap.to(".square", {
            scale: 0.1,
            duration: 1.2,
            ease: "power1.inOut",
            // repeat: -1,
            // yoyo: true,
            stagger: {
                each: 0.1,
                from: "center",
                grid: "auto",
                repeat: -1,
                yoyo: true
            }
        })
    }, { scope: container3 })

    useGSAP(() => {
        gsap.from(".square", {
            scale: 0,
            duration: 1,
            repeat: -1,
            ease: "power3.inOut",
            yoyo: true,
            stagger: {
                each: 0.2,
                from: "random"
            }
        })
    }, { scope: container })

    useGSAP(() => {
        const boxes = boxesRef.current;
        boxes.forEach((box) => {

            gsap.from(box, {
                scale: 2,
            })

            gsap.to(box, {
                x: 400,
                scale: 0,
                scrollTrigger: {
                    trigger: box,
                    scrub: true,
                    scroller: container2.current,
                    immediateRender: false
                },
            })
        })

        const squares = squaresRef.current;
        squares.forEach((square) => {
            gsap.to(square, {
                reversed: true,
                x: -400,
                scale: 0,
                scrollTrigger: {
                    trigger: square,
                    scrub: true,
                    scroller: container2.current,
                },
            })
        })
    }, { scope: container2 })

    return (
        <section
            className=" w-full space-y-10"
        >
            <div
                ref={container}
                className="flex flex-wrap justify-center items-center"
            >
                {
                    Array(6).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className=" square w-20 h-20 bg-gray-200 rounded-md shadow-md m-2"
                        />
                    ))
                }
            </div>

            <div
                ref={container3}
                className="grid grid-cols-24 gap-4 py-52"
            >
                {
                    Array(24 * 9).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className={cn("square w-10 h-10 bg-gray-200 rounded-md shadow-md")}
                        />
                    ))
                }
            </div>

            <div
                ref={container2}
                className=" h-[500px] bg-black/30 p-10 rounded overflow-y-scroll flex items-stretch gap-20 "
            >
                <div
                    className="w-full"
                >
                    {
                        Array(10).fill(0).map((_, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    if (el) {
                                        boxesRef.current[index] = el;
                                    }
                                }}
                                className={cn("circle w-64 aspect-square mb-[100vh]", index % 2 === 0 ? "bg-blue-500 rounded" : "bg-red-500 rounded-full")}
                            />
                        ))
                    }
                </div>

                <div
                    className="w-full flex flex-col items-end"
                >
                    {
                        Array(10).fill(0).map((_, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    if (el) {
                                        squaresRef.current[index] = el;
                                    }
                                }}
                                className={cn("square w-64 aspect-square mb-[100vh]", index % 2 === 0 ? "bg-red-500 rounded-full" : "bg-blue-500 rounded")}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

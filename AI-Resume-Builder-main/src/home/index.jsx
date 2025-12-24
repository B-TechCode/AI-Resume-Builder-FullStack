import Header from '@/components/custom/Header'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'

function Home() {
    return (
        <div>
            <section className="z-50">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

                    {/*  TOP BADGE REMOVED */}
                    {/*
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full"
            role="alert"
          >
            <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">
              New
            </span>
            <span className="text-sm font-medium">
              Tubeguruji.com All new Apps
            </span>
          </a>
          */}

                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                        Build Your Resume <span className="text-primary">With AI</span>
                    </h1>

                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                        Effortlessly Craft a Standout Resume with Our AI-Powered Builder
                    </p>

                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a
                            href="/dashboard"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-primary hover:bg-primary"
                        >
                            Get Started
                        </a>

                        {/* WATCH VIDEO BUTTON REMOVED */}
                        {/*
            <a
              href="https://youtu.be/Q5LM985yUmQ"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-gray-900 rounded-lg border"
            >
              Watch video
            </a>
            */}
                    </div>

                    {/*  FEATURED IN SECTION REMOVED */}
                    {/*
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">
              FEATURED IN
            </span>
          </div>
          */}
                </div>
            </section>

            {/* HOW IT WORKS SECTION (UNCHANGED) */}
            <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h2 className="font-bold text-3xl">How it Works?</h2>
                <h2 className="text-md text-gray-500">
                    Give mock interview in just 3 simple easy steps
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl">
                        <AtomIcon className="h-8 w-8" />
                        <h2 className="mt-4 text-xl font-bold">Write prompt for your form</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Create intelligent prompts to generate resume content.
                        </p>
                    </div>

                    <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl">
                        <Edit className="h-8 w-8" />
                        <h2 className="mt-4 text-xl font-bold">Edit Your form</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Customize and refine generated content easily.
                        </p>
                    </div>

                    <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl">
                        <Share2 className="h-8 w-8" />
                        <h2 className="mt-4 text-xl font-bold">
                            Share & Start Accepting Responses
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Share your resume instantly and start applying.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">

                    <a
                        href="/dashboard"
                        className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white hover:bg-pink-700"
                    >
                        Get Started Today
                    </a>


                </div>
            </section>
        </div>
    )
}

export default Home

import React from 'react';

function Home() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {/* Content Section */}
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              Welcome to the Past Papers Repository
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Access past papers, improve your study, and get ready for exams with our extensive archive.
            </p>
          </div>

          {/* Graphic Section */}
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
              <svg viewBox="0 0 1026 1026" fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full animate-spin-slow">
                <path d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z" stroke="#D4D4D4" strokeOpacity="0.7"></path>
              </svg>
            </div>
            <div className="relative aspect-[366/729] mx-auto max-w-[366px]">
              <div className="absolute left-[calc(23/366*100%)] top-[calc(23/729*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] bg-gray-900 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
        <ul
          role="list"
          className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
        >
          <li className="flex">
            <img
              alt="Forbes"
              loading="lazy"
              className="h-16 w-32 object-contain" // Set equal height and width for consistency
              src="/cam.jpeg"
            />
          </li>
          <li className="flex">
            <img
              alt="TechCrunch"
              loading="lazy"
              className="h-16 w-32 object-contain" // Set equal height and width for consistency
              src="/igcse.jpeg"
            />
          </li>
        </ul>
      </div>

      </div>
    </div>
  );
}

export default Home;
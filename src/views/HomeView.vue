<script setup lang="ts">
</script>

<template>
  <div class="p-4 sm:ml-64">
    <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 xl:pt-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black-900">
                  Shorten Your Links with Tiny URL
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Easily create short, branded links for your business or personal use. Track your link performance with
                  detailed analytics.
                </p>
              </div>
              <div className="space-x-4">
                <RouterLink to="/create" className=" pointer inline-flex h-9 items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                  Shorten URL
                </RouterLink>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Fast Processing
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Instant Link Shortening</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our URL shortener works lightning fast, so you can share your links in no time.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Custom URLs
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Personalize Your Links</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Create custom, memorable URLs to better represent your brand and content.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Analytics
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Track Your Links</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Get detailed analytics on your shortened links, including click-through rates and referral sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  </div>
</template>

import Head from 'next/head'

const SEOHead = () => {
  return (
    <Head>
      <title>resume-enhancer</title>
      <meta name="description" content="AI-powered resume enhancement tool that helps align your resume with job descriptions and creates custom cover letters for premium members" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="icon" href="/my_logo.svg" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://enhance.dahlton.org" />
      <meta property="og:title" content="resume-enhancer" />
      <meta property="og:description" content="AI-powered resume enhancement tool that helps align your resume with job descriptions and creates custom cover letters for premium members" />
      <meta property="og:image" content="/my_logo.svg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://enhance.dahlton.org" />
      <meta property="twitter:title" content="resume-enhancer" />
      <meta property="twitter:description" content="AI-powered resume enhancement and cover letter generation" />
      <meta property="twitter:image" content="/my_logo.svg" />
      <meta name="twitter:creator" content="@linkinlogger" />

      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://enhance.dahlton.org" />
    </Head>
  )
}

export default SEOHead

export function appDomain() {
  let domain = process.env.APP_DOMAIN || process.env.NUXT_ENV_VERCEL_URL || process.env.VERCEL_URL || undefined

  if (domain && !domain.includes('://')) {
    const protocol = process.env.APP_PROTOCOL ?? 'https://'
    domain = `${protocol}${domain}`
  }

  return domain
}

export function appEnvironment() {
  return process.env.APP_ENVIRONMENT || process.env.NUXT_ENV_VERCEL_ENV || process.env.VERCEL_ENV || 'production'
}

export function appCommitSha() {
  return process.env.NUXT_ENV_VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT || undefined
}

export function appCommitBranch() {
  return process.env.NUXT_ENV_VERCEL_GIT_COMMIT_REF || process.env.VERCEL_GIT_COMMIT_REF || undefined
}

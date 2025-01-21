const fakeUsers = [
  'Kevin',
  'James',
  'Jane',
  'Jacob',
  'Josh',
  'Jo Foo',
  'Jo Bar',
  'Jason',
  'Brian',
  'P@ul',
  'Peter',
  'Mick',
  'Joe',
  'Jim',
]

export async function getFakeUsers(matchString: string) {
  return fakeUsers.filter(user =>
    user.toLowerCase().startsWith(matchString.toLowerCase())
  )
}

const fakeHashtags = [
  'Re@ct',
  'Vue',
  'Ang#lar',
  'svelte',
  'node',
  'Nodejs',
  'Express',
  'Next',
  'Nuxt',
  'Gatsby',
  'Sapper',
  'Redux',
  'MobX',
  'GraphQL',
  'Apollo',
  'REST',
]

export async function getFakeHashtags(matchString: string) {
  return fakeHashtags.filter(tag =>
    tag.toLowerCase().startsWith(matchString.toLowerCase())
  )
}

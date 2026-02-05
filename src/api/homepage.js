import request from '../utils/request/request.js'
export const getHomepageInfo = async () => {
  const data = await request.get('/')
  return data
}

var cfg = {
  dev: 'http://10.8.7.24:9000',

  // //sit环境
  pro: 'http://10.8.7.24:9000',

  //  uat环境
  uat: 'https://lease-test.cgrzzl.com/gateway'

}

var base_url = ''
switch (process.env.NODE_ENV) {
  case 'development':
    base_url = cfg.dev
    break
  case 'production':
    base_url = cfg.pro
    break
  case 'uat':
    base_url = cfg.uat

    break
}

export const baseURL = base_url


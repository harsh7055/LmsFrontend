const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/BNJNUU88223X2YDS_TST',
    createProxyMiddleware({
      target: 'https://mingle-sso.se1.inforcloudsuite.com:443',
      changeOrigin: true,
    })
  );



  app.use(
    '/BNJNUU88223X2YDS_TST/WM/wmwebservice_rest',
    createProxyMiddleware({
      target: 'https://mingle-ionapi.se1.inforcloudsuite.com',
      changeOrigin: true,
    })
  );

  
};
  
// https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_TST/WM/wmwebservice_rest/BNJNUU88223X2YDS_TST_REDAWESOMEOWL_TST_SCE_PRD_0_wmwhse1/locations/G1A.01.A1

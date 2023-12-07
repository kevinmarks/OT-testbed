import honeycomb_sdk from './tracing.mjs';
import opentelemetry from '@opentelemetry/api';
import {
    context,
    propagation,
  } from '@opentelemetry/api';
const tracer = opentelemetry.trace.getTracer("my-service-tracer");
  
const server={};
import express from 'express';
//import mysql from 'mysql2'; 
// import nunjucks from 'nunjucks'; 
import path from 'path'; 
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

function make_ot_span(req,res,next){
    tracer.startActiveSpan("request_"+ req.method+ req.path, (span) => {
         // listener for response.on('finish') so we get the full duration
         const onResponseFinish = () => {
            span.end();
          };
        // add the express request info, as the express automation didn't work
        ot_addTraceContext({"request.method":req.method, "request.route":req.path, "request.path":req.path, "request.ip":req.ip,"request.hostname":req.hostname});
        res.once('finish', onResponseFinish);
        next();
    });
}

const app = express();
app.use(express.static(path.resolve(__dirname, '../static'),{'maxAge':10000000}));
app.use(express.urlencoded({"extended":false}));
app.set('views', 'views');
//app.use(make_ot_span);
// const nun_env = nunjucks.configure(path.resolve(__dirname, '../views'), {
//     autoescape: true,
//     express: app
// });
server.app = app;

var port = process.env.PORT || 8989;
app.listen(port, function() {
  console.log("OT-testbed Listening on " + port);
});

app.get('/',function (req, res) {
    res.send("Hello World")
})

export {server as default, app}

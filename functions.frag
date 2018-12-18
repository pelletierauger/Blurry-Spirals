precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

uniform float time;

// float plot(vec2 s, float p) {
//   float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
//   return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
// }

float circ(float speed, float size, float vx, float vy, float dist) {
  float x = cos(time * speed) * dist * 0.012 - 0.425;
  float y = sin(time * speed) * dist * 0.012 - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
  return d;
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}

float plot(vec2 st, float pct, float dist) {
  return  smoothstep( pct - dist, pct, st.y) -
          smoothstep( pct, pct + dist, st.y);
}

void main() {

    // vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // // float d2 = 1.0 / length(v * 25.0);

    // float c = 0.0;
    // // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);

    // for (int i = 0; i < 100; i += 1) {
    //   float s = float(i) + 1.0;
    //   // Spidery
    //   // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
    //   // Classic
    //   // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
    //   // Spidery 2
    //   float e = circ(0.025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
    //   c = c + e;
    // }
    // float rando = rand(vec2(uv.x, uv.y));
    // // float c = 0.0;
    // // gl_FragColor = vec4(1.0 - c * 0.5, 1.0 - c * 0.05, 0.5 - c, 1.0);
    // gl_FragColor = vec4(vec3(1.0 - c * 0.05 + (rando * 0.1)), 1.0);
    // // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);



    // Normalized pixel coordinates (from 0 to 1)
    // vec2 uv = fragCoord/iResolution.xy;


    // vec2 uv = gl_FragCoord.xy / vec2(2560, 1600);
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);

    // uv.x = uv.x * 2. * (2560. / 1600.);
    // uv.y = uv.y * 2.;
    uv = uv * 2.;
    // uv.y = uv.y * 2.;
    uv.x = uv.x - 0.5;
    uv.y = uv.y - 0.5;
    // vec2 st = vec2(uv.x+(time*.001), uv.y);
    vec2 st = uv;
    
    // Initialize the color vector
    vec3 col = vec3(0.0);
    
    // GRID
    // col += vec3(grid(uv, 16.0, 0.15).x + 
    //           vec3(grid(uv, 4.0, 0.3).x));
    // col += vec3(grid(uv, 16.0, 0.15).y + 
    //           vec3(grid(uv, 4.0, 0.3).y));
    // col.x += axes(uv).x + axes(uv).y;
    
    // float y = clamp(fract(sin(st.x * time * 0.0001)*1000.0), 0.25, 0.75);
    
    // float t = time * 0.1;

    // Briques
    // float t = time * 0.1;
    // float y = tan(st.x * (t + 300.) * 0.01) * tan(st.y * 10.0 * t * 0.01);
    // st.y = sin((st.x * st.y * 0.075) * t * 10.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 10., 1335.);


    // Oeil de boeuf
    // float t = time * 0.01;
    // float y = sin(st.x * (t + 300.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 100.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 1000., 335.);


    float t = time * 0.01;
    float y = sin(st.x * (t + 300.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    st.y = sin((st.x * st.y * 0.075) * t * 100.) * 4.;
    // float pct = plot(st, y * st.y);
    float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 1000., 335.);






    // float t = time * 0.01;
    // float y = sin(st.x * (t + 300.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 1000.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 1000., 535.);


    // float t = time * 0.01;
    // float y = sin(st.x * (t + 30.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 1000.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 1000., 535.);


    // float t = time * 0.01;
    // float y = tan(st.x * (t + 3.) * 0.1) * tan(st.y * 10.0 * t * 0.1);
    // st.y = tan((st.x * st.y * 0.075) * t * 1000.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.005)) * 50.), y * 1000., 1535.);



    // float t = time * 1.;
    // float y = tan(st.x * (t + 300.) * 0.01) * tan(st.y * 10.0 * t * 0.01);
    // st.y = sin((st.x * st.y * 0.0075) * t * 100.) * 40.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05) * 10.) * 50.), y * 1000., 10535.);


    // float t = time * 1.;
    // float y = tan(st.x * (t + 300.) * 0.01) * tan(st.y * 10.0 * t * 0.01);
    // st.y = sin((st.x * st.y * 0.0075) * t * 100.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05) * 100.) * 50.), y * 10000., 10535.);




    // float t = time * 1.;
    // float y = tan(st.x * (t + 300.) * 0.1) * tan(st.y * 10.0 * t * 0.1);
    // st.y = sin((st.x * st.y * 0.0075) * t * 100.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05) * 100.) * 50.), y * 10000., 10535.);



    // float t = time * 1.;
    // float y = tan(st.x * (t + 1.) * 0.1) * tan(st.y * 1.0 * t * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 100.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.005) * 100.) * 50.), y * 1000., 10535.);


    // float t = time * 0.01;
    // float y = sin(st.x * (t + 30.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    // st.y = sin((st.x * st.x * 0.75) * t * 100.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 1000., 335.);


    // float t = time * 0.001;
    // float y = tan(t * (t + 300.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    // st.y = sin((t * st.x * 0.75) * t * 100.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(st.x * 5.)) * 500.), y * 1000., 1735.);


    // float t = 10. + time * 0.001;
    // float y = tan(t * (t + 300.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    // st.y = sin((t * st.x * 0.075) * t * 1000.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (tan(sin(st.x * t * 5.)) * 500.), y * 1000., 1735.);


    // Interesting white vertical stripes with waves in them
    // float t = time * 0.01;
    // float y = tan(st.x * (t + 300.) * 0.1);
    // y = y * tan(st.x * (t + 300.) * 0.1) * tan(st.x * (t + 300.) * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 1000.) * 4.;
    // // st.y = st.y * tan(st.x * (t + 300.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 5000.), y * 1000., 105035.);


    // float t = time * 0.01;
    // float y = tan(st.x * (t + 300.) * 0.1);
    // y = y * tan(st.x * (t + 300.) * 0.1) * tan(st.x * (t + 300.) * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 1000.) * 4.;
    // st.y = st.y * tan(st.x * (t + 300.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 5000.), y * 1000., 105035.);



    // Mysterious bulbs
    // float t = time * 0.01;
    // float y = tan(st.x * (t + 3.) * 0.1);
    // y = y * tan(st.x * (t + 300.) * 0.1) * tan(st.x * (t + 300.) * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 1000.) * 4.;
    // st.y = st.y * tan(st.x * (t + 300.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 5000.), y * 1000., 105035.);
    // pct = pct + (st.y * tan(st.x * (t + 300.) * 0.1) * 0.0125);
    // pct = 1. - pct;


    // Mysterious bulbs with a grey background
    // float t = time * 0.01;
    // float y = tan(st.x * (t + 3.) * 0.1);
    // y = y * tan(st.x * (t + 300.) * 0.1) * tan(st.x * (t + 300.) * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 1000.) * 4.;
    // st.y = st.y * tan(st.x * (t + 300.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 5000.), y * 1000., 105035.);
    // pct = pct + (st.y * tan(st.x * (t + 300.) * 0.1) * 0.0125);
    // pct = 1. - (pct * 0.5);


    // Zoom out on a glowing, metallic logo
    // float t = time * 0.1;
    // float y = tan(st.y * st.x * (t * 300.) * 0.01);
    // y = y + tan(st.y * st.x * (t * 300.) * 0.01);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * ((sin(time * 0.05) * 10.) * 500.), y * 100., 1335.);
    // // pct = pct + (st.y * tan(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);



    // float t = time * 0.01;
    // float y = sin(st.x * (t + 30.) * 0.1) * sin(st.y * 100.0 * t * 0.1);
    // st.y = sin((st.x * st.x * 0.075) * t * 1000.) * 1.;
    // st.y = sin((st.x * st.x * 0.075) * t * 1000.) * 1.;
    // st.y = sin((st.x * st.x * 0.075) * t * 1000.) * 1.;
    // st.y = sin((st.x * st.x * 0.075) * t * 1000.) * 1.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 1000., 350.);


    // Ripples in a pond
    // float t = time * 0.01;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 300.) * 0.1);
    // st.y = tan((st.x * sin(st.y * 10.) * 0.075) * t * 1000.) * 4.;
    // st.y = st.y * sin(st.x * (t + 300.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 5000.), y * 1000., 105035.);
    // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);


    // float t = time * 0.01;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 300.) * 0.1);
    // st.y = tan((st.x * sin(st.y * y * 10.) * 0.075) * t * 1000.) * 4.;
    // st.y = st.y * sin(st.x * (t + 300.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 5000.), y * 1000., 105035.);
    // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);



    // float t = time * 0.01;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 300.) * 0.1);
    // st.y = tan((st.x * y * sin(st.y * y * 10.) * 0.075) * t * 1000.) * 4.;
    // st.y = st.y * sin(t * (y + 300.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 5000.), y * 1000., 105035.);
    // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);





    // float t = time * 0.1;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 300.) * 0.1);
    // st.y = tan((st.x * st.y * sin(y * 1.) * 0.075) * t * 1000.) * 4.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 50.), y * 10., 135.);
    // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);


    // Afternoon on the chair
    // st = st * 1.05;
    // float t = time * 0.1;
    // float y = sin(st.y * (t + 30.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 300.) * 0.1);
    // st.y = tan(st.x * y * t * 2.) * 4.;
    // float pct = plot(st * 100., y * 100., 1235.);


    // float t = time * 0.1;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 300.) * 0.1);
    // st.y = tan((st.x * y * sin(y * 1.) * 0.075) * t * 1000.) * 4.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 50.), y * 10., 135.);
    // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);


    // st = st * 1.035;
    // float t = time * 0.1;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 300.) * 0.1);
    // st.y = tan((st.x * y * sin(y * 1.) * 0.075) * t * 1000.) * 4.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 50.), y * 10., 135.);
    // // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);






    // float t = time * 0.1;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(st.y * (t + 300.) * 0.1) * sin(st.x * (t + 3.) * 0.1);
    // st.y = tan((sin(y * 1.) * 0.00075) * t * 1000.) * 4.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 50.), y * 10., 135.);
    // // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);


    // float t = time * 0.1;
    // float y = sin(st.y * (t + 3.) * 0.1);
    // y = y * sin(y * (t + 300.) * 0.1) * sin(st.x * (t + 3.) * 0.1);
    // st.y = tan((sin(y * 1.) * 0.00075) * t * 1000.) * 4.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 50.), y * 10., 135.);
    // // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);



    // float t = time * 1.;
    // float y = sin(st.y * (t + 3.) * 0.01);
    // y = y * sin(y * (t + 300.) * 0.1) * sin(st.x * (t + 3.) * 0.1);
    // // st.y = tan((tan(y * 10.) * 0.00075) * t * 1000.) * 40.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(tan(time * 0.05)) * 50.), y * 10., 15.);
    // // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);






    // uv.x = uv.x * 1.5;
    // st = vec2(atan(uv.x, uv.y), length(uv));
    // uv = vec2(st.x/6.2831+5., st.y);
    // // st.x = st.x * 0.125;
    // float x = uv.x*5.;
    // float m = min(fract(x), fract(1.-x));

    // float t = time * 1.;
    // float y = sin(st.y * (t + 3.) * 0.01);
    // y = y * abs(sin(y * (t + 300.) * 0.01)) * abs(sin(st.x * (t + 3.) * 0.01));
    // st.y = tan((tan(y * 0.1) * 0.00075) * t * 1000.) * 40.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 50.), y * 10., 1500.);
    // // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);







    // uv.x = uv.x * 1.5;
    // st = vec2(atan(uv.x, uv.y), length(uv));
    // uv = vec2(st.x/6.2831+5., st.y);
    // // st.x = st.x * 0.125;
    // float x = uv.x*5.;
    // float m = min(fract(x), fract(1.-x));

    // float t = time * 1.;
    // float y = sin(st.y * (t + 3.) * 0.01);
    // y = y * abs(sin(y * (t + 300.) * 0.01)) * abs(sin(st.x * (t + 3.) * 0.01));
    // st.y = tan((tan(y * 0.1) * 0.00075) * t * 1000.) * 40.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 50.), y * 100., 1500.);
    // // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);






    // uv.x = uv.x * 1.5;
    // st = vec2(atan(uv.x, uv.y), length(uv));
    // uv = vec2(st.x/6.2831+5., st.y);
    // // st.x = st.x * 0.125;
    // float x = uv.x*5.;
    // float m = min(fract(x), fract(1.-x));

    // float t = time * 1.;
    // float y = sin(st.y * (st.x + 3.) * 0.01);
    // y = y * sin(m * (m + 300.) * 0.01);
    // st.y = tan((sin(m * 0.1) * 0.75) * m * 10.) * 40.;
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 50.), m * 100., 1500.);
    // // pct = pct + (t * sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);






    // uv.x = uv.x * 1.5;
    // st = vec2(atan(uv.x, uv.y), length(uv));
    // uv = vec2(st.x/6.2831+5., st.y);
    // // st.x = st.x * 0.125;
    // float x = uv.x * 5.;
    // float m = min(fract(x), fract(1.-x));

    // float t = time * 100.;
    // float y = sin(st.y * (t + 3.) * 0.01);
    // y = y * abs(sin(y * (t + 300.) * 0.01)) * abs(sin(st.x * (t + 3.) * 0.01));
    // // st.y = mod(fract(tan((tan(y * 0.1) * 0.00075) * t * 1000.) * 40.), 1000.);
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05 *m)) * 50.), y * 100., 40.);
    // // pct = pct + (t r* sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);
    // pct = pct * mod(m, 10.);






    // uv.x = uv.x * 1.5;
    // st = vec2(atan(uv.x, uv.y), length(uv));
    // uv = vec2(st.x/6.2831+5., st.y);
    // // st.x = st.x * 0.125;
    // float x = uv.x * 0.1;
    // float m = min(fract(x), fract(1.-x));

    // float t = 100. + time * 1.;
    // float y = sin(st.y * t * 0.1);
    // y = y * m;
    // y = y * fract(sin(y));
    // // y = y * abs(tan(y * (t + 3.) * 0.01)) * abs(tan(st.x * (t + 3.) * 0.01));
    // // st.y = mod(fract(tan((tan(y * 0.1) * 0.00075) * t * 1000.) * 40.), 1000.);
    // // st.y = st.y * y * 20. * sin(t * (y * 20.) * 0.1);
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st, y * 1000., 40.);
    // pct = pct * length(vec2(fract(st.x), 0.));
    // // pct = pct + (t r* sin(st.x * (t + 300.) * 0.1) * 0.0125);
    // // pct = 1. - (pct * 0.5);
    // // pct = pct * mod(m, 10.);




    // float y = sin(st.x * (t + 300.) * 0.1) * sin(st.y * 10.0 * t * 0.1);
    // st.y = sin((st.x * st.y * 0.075) * t * 10.) * 4.;
    // // float pct = plot(st, y * st.y);
    // float pct = plot(st * (abs(sin(time * 0.05)) * 500.), y * 10.);

    // col = (1.0 - pct) * col + pct * vec3(1.0, 1.0, 1.0);
    col = col + pct;
float rando = rand(vec2(uv.x, uv.y));
    // Output to screen
    // gl_FragColor = vec4(col - (rando * 0.1), 1.0);
    gl_FragColor = vec4(col - (rando * 0.1), 1.0);
}
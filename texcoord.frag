precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

uniform float time;

float plot(vec2 s, float p) {
  float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
  return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}

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

void main() {

    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // float d2 = 1.0 / length(v * 25.0);

    float c = 0.0;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);

    for (int i = 0; i < 100; i += 1) {
      float s = float(i) + 1.0;
      // Spidery
      // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Classic
      // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Spidery 2
      float e = circ(0.025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      c = c + e;
    }
    float rando = rand(vec2(uv.x, uv.y));
    // float c = 0.0;
    // gl_FragColor = vec4(1.0 - c * 0.5, 1.0 - c * 0.05, 0.5 - c, 1.0);
    gl_FragColor = vec4(vec3(1.0 - c * 0.05 + (rando * 0.1)), 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);

}
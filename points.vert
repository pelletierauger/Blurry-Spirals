attribute vec3 coordinates;

void main() {
   gl_Position = vec4(coordinates, 1.0);
   // gl_Position.x = gl_Position.x * 50.0;
   gl_PointSize = 10.0;
}
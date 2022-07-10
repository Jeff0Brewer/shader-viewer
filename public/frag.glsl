precision highp float;

uniform vec2 uDimensions;
uniform float uTime;
void main() {
    vec3 coord = vec3(gl_FragCoord.xy/uDimensions, uTime);
    vec3 col = vec3(0.0, 0.0, 0.0);

    float time = uTime*.3;

    coord.x += cos(coord.y + time);
    coord.y += sin(coord.x + time);
    col.x = sin(coord.x*60.0 + time);
    col.z = cos(coord.y*60.0 + time);


    gl_FragColor = vec4(col, 1.0);
}

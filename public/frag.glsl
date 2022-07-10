precision highp float;

uniform vec2 uDimensions;
uniform float uTime;
void main() {
    vec3 coord = vec3(gl_FragCoord.xy/uDimensions, uTime);

    vec3 col = vec3(0.0, 0.0, 0.0);

    col.x = sin(coord.x*10.0 + uTime);
    col.y = cos(coord.y*10.0 + uTime);


    gl_FragColor = vec4(col, 1.0);
}

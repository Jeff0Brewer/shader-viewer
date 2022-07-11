precision highp float;

uniform vec2 uDimensions;
uniform float uTime;
void main() {
    vec3 coord = vec3(gl_FragCoord.xy/uDimensions, uTime);
    vec3 col = vec3(0.0, 0.0, 0.0);

    float time = uTime*.5;

    float tScale = 1.0;
    for (int i = 0; i < 5; i++) {
        coord.x += cos(coord.y + tScale*time);
        coord.y += sin(coord.x + tScale*time);
        tScale *= .8;
    }

    col.x = sin(coord.x*10.0 + time);
    col.z = cos(coord.y*10.0 + time);


    gl_FragColor = vec4(col, 1.0);
}

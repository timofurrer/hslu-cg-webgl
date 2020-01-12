attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
attribute vec3 aVertexNormal;
attribute vec2 aVertexTexCoord;

uniform mat4 uProjMat;
uniform mat4 uViewMat;
uniform mat3 uNormalViewMat;
uniform mat4 uWorldMat;

varying vec3 fragColor;
varying vec2 vTexCoord;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

void main () {
    //  calculate  the  vertex  position  in eye  coordinates
    vec4  vertexPositionEye4 = uViewMat * uWorldMat * vec4(aVertexPosition , 1.0);
    vVertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;

    //  calculate  the  normal  vector  in eye  coordinates
    vNormalEye = normalize(uNormalViewMat * aVertexNormal);

    // set  texture  coordinates  for  fragment  shader
    vTexCoord = aVertexTexCoord;

    // set  color  for  fragment  shader
    fragColor = aVertexColor;

    //  calculate  the  projected  position
    gl_Position = uProjMat * vertexPositionEye4;
    // gl_Position = uProjMat * uViewMat * uWorldMat * vec4(aVertexPosition, 1);
}

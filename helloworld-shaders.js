;

var vertCode = `#version 300 es
uniform mat4 modelview_matrix;
uniform mat4 projection_matrix;

in vec2 vertex_coordinates; 
in vec3 vertex_color;

out vec3 color;
void main(void)
{
	gl_Position = projection_matrix * modelview_matrix * vec4(vertex_coordinates,0.0, 1.0);
	color = vertex_color;
}`;

var fragCode = `#version 300 es
precision mediump float;

#define VERTEX_COLOR

in vec3 color;

out vec4 color_output;

void main(void)
{
	#ifdef VERTEX_COLOR
	color_output = vec4(color, 1.0);
	#else
	color_output = vec4(gl_FragCoord.xy / 512.0, 0, 1.0);
	#endif
}`;



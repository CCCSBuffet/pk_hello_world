;

var solid_vertex_shader = `#version 300 es
uniform mat4 u_modelview_matrix;
uniform mat4 u_projection_matrix;
in vec3 a_vertices;
void main(void)
{ 
	gl_Position = u_projection_matrix * u_modelview_matrix * vec4(a_vertices, 1.0);
}`;

var solid_fragment_shader = `#version 300 es
precision mediump float;
uniform vec4 u_color;
out vec4 out_color;
void main(void)
{
	out_color = u_color;
}`;

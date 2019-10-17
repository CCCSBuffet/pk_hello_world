class Triangle {
	constructor(shader) {
		this.vertices = [ 
			-0.5, -0.5, 0, 
			 0.5, -0.5, 0, 
			 0.0, 0.5, 0
		];

		shader.UseProgram();
		this.a_vertices = shader.GetAttributeLocation('a_vertices');
		this.u_modelview_matrix = shader.GetUniformLocation('u_modelview_matrix');
		this.u_projection_matrix = shader.GetUniformLocation('u_modelview_matrix');
		this.u_color = shader.GetUniformLocation('u_color');
		shader.EndProgram();

		/*	A vertex array object wraps one or more attribute buffers plus associated state
		*/

		this.vertex_buffer = gl.createBuffer();
		if (!this.vertex_buffer) {
			throw 'Creation of vertex buffer failed.';
		}

		gl.enableVertexAttribArray(this.a_vertices);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		gl.vertexAttribPointer(this.a_vertices, 3, gl.FLOAT, false, 0, 0);
		gl.bindVertexArray(null);
		console.log('Triangle: build successful.');
	}

	SetModelview(matrix) {
		gl.uniformMatrix4fv(this.u_modelview_matrix, false, matrix);
	}

	SetProjection(matrix) {
		gl.uniformMatrix4fv(this.u_projection_matrix, false, matrix);
	}

	SetColor(color) {
		//gl.uniform4fv(this.u_color, color);
	}

	Draw(modelview, projection) {
		gl.enableVertexAttribArray(this.a_vertices);
		gl.vertexAttribPointer(this.a_vertices, 3, gl.FLOAT, false, 0, 0);
		this.SetModelview(modelview);
		this.SetProjection(projection);
		//this.SetColor(vec4.fromValues(1,1,1,1));
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}
}
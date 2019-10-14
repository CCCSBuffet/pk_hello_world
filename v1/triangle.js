class Triangle {
	constructor(shader) {
		var vertices = [ -0.5, -0.5, 0, 0.5, -0.5, 0, 0.0, 0.5, 0 ];
		var indices = [ 0, 1, 2 ];

		this.vao = gl.createVertexArray();
		if (!this.vao) {
			throw 'Creation of vertex array object failed.';
		}
		gl.bindVertexArray(this.vao);

		this.vertex_buffer = gl.createBuffer();
		if (!this.vertex_buffer) {
			throw 'Creation of vertex buffer failed.';
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		this.index_buffer = gl.createBuffer();
		if (!this.vertex_buffer) {
			throw 'Creation of index buffer failed.';
		}
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

		shader.UseProgram();
		this.a_vertices = shader.GetAttributeLocation('a_vertices');
		this.u_modelview_matrix = shader.GetUniformLocation('u_modelview_matrix');
		this.u_projection_matrix = shader.GetUniformLocation('u_modelview_matrix');
		shader.EndProgram();

		gl.vertexAttribPointer(this.a_vertices, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.a_vertices);
		gl.bindVertexArray(null);

		console.log('Triangle: build successful.');
	}

	SetModelview(matrix) {
		gl.uniformMatrix4fv(this.u_modelview_matrix, false, matrix);
	}

	SetProjection(matrix) {
		gl.uniformMatrix4fv(this.u_projection_matrix, false, matrix);
	}

	Draw(modelview, projection) {
		
	}
}

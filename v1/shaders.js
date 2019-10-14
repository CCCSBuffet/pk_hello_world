class Shader
{	
	constructor(shader_name, vrtx_id, frag_id, mode) {
		this.name = shader_name;
		this.prog = this.CreateShader(shader_name, vrtx_id, frag_id, mode);
	}

	UseProgram()
	{
		gl.useProgram(this.prog);
	}

	EndProgram()
	{
		gl.useProgram(null);
	}

	GetAttributeLocation(attribute) {
		let a = gl.getAttribLocation(this.prog, attribute);
		if (a < 0) {
			throw this.name + '.GetAttribLocation(' + attribute + ') failed.';
		}
		return a;
	}
	
	GetUniformLocation(uniform) {
		let u = gl.getUniformLocation(this.prog, uniform);
		if (u < 0) {
			throw this.name + '.GetUniformLocation(' + uniform + ') failed.';
		}
		return u;
	}
	
	CreateShader(shader_name, vrtx_src, frag_src) {
		if (!vrtx_src) {
			throw "Parameter 2 to CreateShader may be missing.";
		}
		if (!frag_src) {
			throw "Parameter 3 to CreateShader may be missing.";
		}

		let vertShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertShader, vrtx_src);
		gl.compileShader(vertShader);
		if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
			throw "Could not compile vertex shader:" + gl.getShaderInfoLog(vertShader);
		}

		let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragShader, frag_src);
		gl.compileShader(fragShader);
		if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
			throw "Could not compile fragment shader:" + gl.getShaderInfoLog(fragShader);
		}

		let shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertShader); 
		gl.attachShader(shaderProgram, fragShader);
		gl.linkProgram(shaderProgram);
		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			throw ("Shader program filed to link:" + gl.getProgramInfoLog (shaderProgram));
		}

		console.log(shader_name + ': build successful.');			
		return shaderProgram;
	}
}
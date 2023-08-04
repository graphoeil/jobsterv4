// Imports
import React from "react";

// Component
const FormRow = React.forwardRef(({ type, name, value, handleChange, labelText, disabled }, ref) => {

	// Return
	return(
		<div className="form-row">
			<label htmlFor={ name } className="form-label">
				{ labelText || name }
			</label>
			<input ref={ ref } type={ type } id={ name } name={ name } disabled={ disabled }
				className="form-input" value={ value } onChange={ handleChange }/>
		</div>
	);

});

// Export
export default FormRow;
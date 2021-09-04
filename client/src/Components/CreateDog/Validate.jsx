
export function Validate (input) {   //input es mi estado local
 let errors = {};

  if (!input.name) {
    errors.name = 'El nombre de la raza es requerido';
  } else if (!/^[a-zA-Z áéíóúñ]*$/.test(input.name)) {
      errors.name = 'El nombre de la raza deben ser sólo letras'
    } else if (input.name.length > 30 || input.name.length < 3) {
       errors.name = 'El nombre de la raza debe contener de 3 a 30 caracteres';
      }

  if (!input.life_spanMin) {
    errors.life_spanMin = 'Los años mínimos de vida de la raza son requeridos';
  } else if (!/^([0-9])*$/.test(input.life_spanMin)) {
     errors.life_spanMin = 'Los años mínimos de vida de la raza deben ser un número entero'
    } else if (input.life_spanMin < 1 || input.life_spanMin > 99) {
       errors.life_spanMin = 'Los años mínimos de vida de la raza debe contener de 1 a 2 dígitos';
      } else if (input.life_spanMin > input.life_spanMax) {
         errors.life_spanMin = 'Los años mínimos de vida de la raza no puede ser mayor a los máximos';
        }

  if (!input.life_spanMax) {
    errors.life_spanMax = 'Los años máximos de vida de la raza son requeridos';
  } else if (!/^([0-9])*$/.test(input.life_spanMax)) {
     errors.life_spanMax = 'Los años máximos de vida de la raza deben ser un número entero'
    } else if (input.life_spanMax < 1 || input.life_spanMax > 99) {
       errors.life_spanMax = 'Los años máximos de vida de la raza debe contener de 1 a 2 dígitos';
      } else if (input.life_spanMin > input.life_spanMax) {
         errors.life_spanMax = 'Los años máximos de vida de la raza no puede ser menor a los mínimos';
        } else if (input.life_spanMin > 9 && input.life_spanMax < 10) {
          errors.life_spanMax = 'Los años máximos de vida de la raza no puede ser menor a los mínimos'
        }
        
  if (!input.heightMin) {
    errors.heightMin = 'La altura mínima de la raza es requerida';
  } else if (!/^([0-9])*$/.test(input.heightMin)) {
     errors.heightMin = 'La altura mínima de la raza debe ser un número entero'
    } else if (input.heightMin < 10 || input.heightMin > 99) {
       errors.heightMin = 'La altura mínima de la raza debe contener al menos 2 dígitos';
      } else if (input.heightMin > input.heightMax) {
         errors.heightMin = 'La altura mínima de la raza no puede ser mayor a la altura máxima';
        }

  if (!input.heightMax) {
    errors.heightMax = 'La altura máxima de la raza es requerida';
  } else if (!/^([0-9])*$/.test(input.heightMax)) {
     errors.heightMax = 'La altura máxima de la raza debe ser un número entero'
    } else if (input.heightMax < 10 || input.heightMax > 999) {
       errors.heightMax = 'La altura máxima de la raza debe contener de 2 a 3 dígitos';
      } else if (input.heightMin > input.heightMax) {
         errors.heightMax = 'La altura máxima de la raza no puede ser menor a la altura mínima';
        }
  
  if (!input.weightMin) {
    errors.weightMin = 'El peso mínimo de la raza es requerido';
  } else if (!/^([0-9])*$/.test(input.weightMin)) {
     errors.weightMin = 'El peso mínimo de la raza debe ser un número entero'
    } else if (input.weightMin < 1 || input.weightMin > 99) {
       errors.weightMin = 'El peso mínimo de la raza debe contener al máximo 2 dígitos';
      } else if (input.weightMin > input.weightMax) {
         errors.weightMin = 'El peso mínimo de la raza no puede ser mayor al peso máximo';
        }

  if (!input.weightMax) {
    errors.weightMax = 'El peso máximo de la raza es requerido';
  } else if (!/^([0-9])*$/.test(input.weightMax)) {
     errors.weightMax = 'El peso máximo de la raza debe ser un número entero'
    } else if (input.weightMax < 1 || input.weightMax > 99) {
       errors.weightMax = 'El peso máximo de la raza debe contener máximo 2 dígitos';
      } else if (input.weightMin > input.weightMax) {
         errors.weightMax = 'El peso máximo de la raza no puede ser menor al peso mínimo';
        } else if (input.weightMin > 9 && input.weightMax < 10) {
          errors.weightMax = 'El peso máximo de la raza no puede ser menor al peso mínimo'
        }
   
  return errors;
}
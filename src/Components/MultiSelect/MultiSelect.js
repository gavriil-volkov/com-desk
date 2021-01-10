
import Select from 'react-select';
import makeAnimated from 'react-select/animated';





const animatedComponents = makeAnimated();


const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 'none',
  }),


};



export default function AnimatedMulti({handleChange, options}) {

  return (
    <Select

      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      styles={colourStyles}
			onChange={handleChange}
      placeholder={'Выбрать...'}
    />
  );
}


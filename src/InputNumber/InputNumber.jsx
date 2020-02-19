/*
#### Необходимо написать компонент Input Number используя React. Требования:

1. [x] Использовать `<input type="text">`
2. [x] Компонент должен корректно работать при наличии 2-х или более экземпляров на странице
3. [x] Компонент должен поддерживать числа с плавающей запятой
4. [x] Компонент должен иметь визуальные стрелочки "вверх" и "вниз", которые работают аналогично стандартному `<input type="number">`.
5. [x] Компонент должен поддерживать увеличение и уменьшение значение при нажатии на клавиши "Arrow up" и "Arrow down". Если при нажатии зажат "Shift" значение изменяется на 10.
6. [x] Компонент не должен давать возможность ввести что либо отличное от цифры или ".". Больше 1 символа "." в значении быть не должно.
7. [x] Компонент должен корректно принимать и обрабатывать следующие props:
  * [x] value - значение в инпуте
  * [x] min - минимальное значение
  * [x] max - максимальное значение
  * [x] onChange - callback функция, которая вызывается в случае изменения значения в инпуте. В качестве параметра приходит новое значение.
8. [ ] Компонент не должен вызывать рвотных рефлексов.
*/

import React from 'react';

export default class InputNumber extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			value: props.value || props.min || 0
		};

		this.valueUp = this.valueUp.bind( this );
		this.valueDown = this.valueDown.bind( this );
		this.changeHandler = this.changeHandler.bind( this );
		this.keyHandler = this.keyHandler.bind( this );
	}

	render() {
		return (
			<div className='input-number'>
				<input value={this.state.value} onChange={this.changeHandler} onKeyDown={this.keyHandler}/>
				<button className='up' onClick={this.valueUp}>&#9650;</button>
				<button className='down' onClick={this.valueDown}>&#9660;</button>
			</div>
		);
	}

	setValue( value, increment ) {
		let
			stringValid = /^\d*\.?\d*$/.test( value ),
			parsed = parseFloat( value );

		if ( !stringValid || isNaN( parsed ) ) return;
		if ( increment ) value = parsed += increment;

		if ( this.props.min && parsed < this.props.min ) {
			value = this.props.min;
		} else if ( this.props.max && parsed > this.props.max ) {
			value = this.props.max;
		}

		this.setState({ value: value });

		if ( this.props.onChange ) this.props.onChange( value );
	}

	valueUp() {
		this.setValue( this.state.value, 1 );
	}

	valueDown() {
		this.setValue( this.state.value, -1 );
	}

	changeHandler( event ) {
		this.setValue( event.target.value );
	}

	keyHandler( event ) {
		switch( event.keyCode ) {
			case 38:
				if ( event.shiftKey ) this.setValue( this.state.value, 10 );
				else this.setValue( this.state.value, 1 );
				break;
			case 40:
				if ( event.shiftKey ) this.setValue( this.state.value, -10 );
				else this.setValue( this.state.value, -1 );
				break;
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
  const KG_PER_LB = 0.45359237;
  const M3_PER_FT3 = 0.028316846592;
  const METERS = { mm: 0.001, cm: 0.01, m: 1, in: 0.0254, ft: 0.3048 };

  document.querySelectorAll('[data-weight-calculator]').forEach((calculator) => {
    const shape = calculator.querySelector('[name="shape"]');
    const unitSystem = calculator.querySelector('[name="unitSystem"]');
    const dimensionUnit = calculator.querySelector('[name="dimensionUnit"]');
    const weightUnit = calculator.querySelector('[name="weightUnit"]');
    const density = calculator.querySelector('[name="density"]');
    const value = calculator.querySelector('[data-result-value]');
    const detail = calculator.querySelector('[data-result-detail]');
    const secondary = calculator.querySelector('[data-result-secondary]');
    const rectangleFields = calculator.querySelector('[data-shape-fields="rectangle"]');
    const coreFields = calculator.querySelector('[data-shape-fields="core"]');
    const dimensionUnitLabels = calculator.querySelectorAll('[data-dimension-unit]');
    const densityUnitLabel = calculator.querySelector('[data-density-unit]');

    let previousDimensionUnit = dimensionUnit.value;

    const numberValue = (input) => {
      const parsed = Number.parseFloat(String(input?.value ?? '').trim().replace(',', '.'));
      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    };

    const format = (number, maximumFractionDigits = 2) =>
      new Intl.NumberFormat(document.documentElement.lang || 'en', {
        maximumFractionDigits
      }).format(number);

    const dimensionInputs = () => Array.from(calculator.querySelectorAll('[data-dimension-input]'));

    const convertDimensionValues = (fromUnit, toUnit) => {
      if (!METERS[fromUnit] || !METERS[toUnit] || fromUnit === toUnit) return;
      dimensionInputs().forEach((input) => {
        const raw = numberValue(input);
        const converted = (raw * METERS[fromUnit]) / METERS[toUnit];
        input.value = Number.isFinite(converted)
          ? String(Number(converted.toFixed(converted < 10 ? 3 : 1)))
          : '0';
      });
    };

    const setSystem = (system, convertValues = true) => {
      const oldDimensionUnit = previousDimensionUnit;
      const newDimensionUnit = system === 'imperial' ? 'in' : 'mm';

      if (convertValues) {
        convertDimensionValues(oldDimensionUnit, newDimensionUnit);
        const currentDensity = numberValue(density);
        density.value = system === 'imperial'
          ? String(Number((currentDensity * KG_PER_LB / M3_PER_FT3).toFixed(1)))
          : String(Number((currentDensity * M3_PER_FT3 / KG_PER_LB).toFixed(0)));
      }

      dimensionUnit.innerHTML = system === 'imperial'
        ? '<option value="in">in</option><option value="ft">ft</option>'
        : '<option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option>';
      dimensionUnit.value = newDimensionUnit;
      previousDimensionUnit = newDimensionUnit;
      densityUnitLabel.textContent = system === 'imperial' ? 'lb/ft³' : 'kg/m³';
      dimensionUnitLabels.forEach((label) => { label.textContent = newDimensionUnit; });
    };

    const updateShape = () => {
      const isCore = shape.value === 'core';
      rectangleFields.hidden = isCore;
      coreFields.hidden = !isCore;
    };

    const calculate = (trackInteraction = false) => {
      const unit = dimensionUnit.value;
      let volumeM3 = 0;

      if (shape.value === 'core') {
        const diameter = numberValue(calculator.querySelector('[name="diameter"]')) * METERS[unit];
        const depth = numberValue(calculator.querySelector('[name="depth"]')) * METERS[unit];
        volumeM3 = Math.PI * Math.pow(diameter / 2, 2) * depth;
      } else {
        const length = numberValue(calculator.querySelector('[name="length"]')) * METERS[unit];
        const width = numberValue(calculator.querySelector('[name="width"]')) * METERS[unit];
        const thickness = numberValue(calculator.querySelector('[name="thickness"]')) * METERS[unit];
        volumeM3 = length * width * thickness;
      }

      const densityKgM3 = unitSystem.value === 'imperial'
        ? numberValue(density) * KG_PER_LB / M3_PER_FT3
        : numberValue(density);
      const kg = volumeM3 * densityKgM3;
      const lb = kg / KG_PER_LB;
      const mainIsLb = weightUnit.value === 'lb';
      const mainWeight = mainIsLb ? lb : kg;
      const otherWeight = mainIsLb ? kg : lb;
      const otherUnit = mainIsLb ? 'kg' : 'lb';
      const volume = unitSystem.value === 'imperial' ? volumeM3 / M3_PER_FT3 : volumeM3;
      const volumeUnit = unitSystem.value === 'imperial' ? 'ft³' : 'm³';

      value.textContent = format(mainWeight, mainWeight < 100 ? 1 : 0) + ' ' + weightUnit.value;
      detail.textContent = format(volume, volume < 10 ? 3 : 2) + ' ' + volumeUnit;
      secondary.textContent = format(otherWeight, otherWeight < 100 ? 1 : 0) + ' ' + otherUnit;

      if (trackInteraction && typeof window.ccTrack === 'function') {
        clearTimeout(calculator._trackTimer);
        calculator._trackTimer = setTimeout(() => {
          window.ccTrack('web_weight_calculation', {
            tool: 'concrete_weight',
            shape: shape.value,
            input_system: unitSystem.value,
            output_unit: weightUnit.value
          });
        }, 900);
      }
    };

    shape.addEventListener('change', () => {
      updateShape();
      calculate(true);
    });

    unitSystem.addEventListener('change', () => {
      setSystem(unitSystem.value, true);
      calculate(true);
    });

    dimensionUnit.addEventListener('change', () => {
      const next = dimensionUnit.value;
      convertDimensionValues(previousDimensionUnit, next);
      previousDimensionUnit = next;
      dimensionUnitLabels.forEach((label) => { label.textContent = next; });
      calculate(true);
    });

    weightUnit.addEventListener('change', () => calculate(true));
    density.addEventListener('input', () => calculate(true));
    dimensionInputs().forEach((input) => input.addEventListener('input', () => calculate(true)));

    updateShape();
    setSystem(unitSystem.value, false);
    calculate(false);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-weight-calculator]').forEach((calculator) => {
    const length = calculator.querySelector('[name="length"]');
    const width = calculator.querySelector('[name="width"]');
    const thickness = calculator.querySelector('[name="thickness"]');
    const density = calculator.querySelector('[name="density"]');
    const value = calculator.querySelector('[data-result-value]');
    const detail = calculator.querySelector('[data-result-detail]');

    const numberValue = (input) => {
      const parsed = Number.parseFloat(String(input.value).trim().replace(',', '.'));
      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    };

    const calculate = () => {
      const l = numberValue(length);
      const w = numberValue(width);
      const t = numberValue(thickness);
      const d = numberValue(density);
      const volume = (l * w * t) / 1_000_000_000;
      const kg = volume * d;

      value.textContent = new Intl.NumberFormat(document.documentElement.lang || 'en', {
        maximumFractionDigits: kg < 100 ? 1 : 0
      }).format(kg) + ' kg';
      detail.textContent = volume.toLocaleString(document.documentElement.lang || 'en', {
        maximumFractionDigits: 3
      }) + ' m³';

      if (typeof window.ccTrack === 'function') {
        clearTimeout(calculator._trackTimer);
        calculator._trackTimer = setTimeout(() => {
          window.ccTrack('web_weight_calculation', { tool: 'concrete_weight' });
        }, 900);
      }
    };

    [length, width, thickness, density].forEach((input) => input.addEventListener('input', calculate));
    calculate();
  });
});

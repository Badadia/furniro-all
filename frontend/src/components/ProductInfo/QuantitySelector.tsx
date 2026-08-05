type QuantitySelectorProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const QuantitySelector = ({
  quantity,
  onDecrement,
  onIncrement,
}: QuantitySelectorProps) => {
  return (
    <div className="flex h-[64px] items-center rounded-lg border border-gray-300">
      <button onClick={onDecrement} className="px-5">
        -
      </button>

      <span>
        {quantity}
      </span>

      <button onClick={onIncrement} className="px-5">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

const Header = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const dayString = today.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="p-6 border-b border-white/30">
      <div className="flex justify-between items-baseline">
        <div>
          <p className="text-sm font-medium text-slate-500">{dayString}</p>
          <p className="text-4xl font-bold text-slate-900">{dateString}</p>
        </div>
        <p className="text-sm font-medium text-slate-500">Momentum</p>
      </div>
      <p className="mt-4 text-slate-600">당신의 계획이 현실이 되는 순간입니다.</p>
    </div>
  );
};

export default Header;
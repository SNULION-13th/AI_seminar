const Header = ({ selectedDate, onDateChange }) => {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  const dayString = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  // Helper to format date for input
  const formatDateForInput = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  return (
    <div className="p-6 border-b border-white/30">
      <div className="flex justify-between items-baseline">
        <div className="flex items-baseline space-x-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{dayString}</p>
            <p className="text-4xl font-bold text-slate-900">{dateString}</p>
          </div>
          <input 
            type="date"
            value={formatDateForInput(selectedDate)}
            onChange={(e) => onDateChange(new Date(e.target.value))}
            className="bg-white/80 border border-white/30 rounded-lg p-2 text-slate-700 text-sm font-semibold shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm font-medium text-slate-500">Momentum</p>
        </div>
      </div>
      <p className="mt-4 text-slate-600">당신의 계획이 현실이 되는 순간입니다.</p>
    </div>
  );
};

export default Header;
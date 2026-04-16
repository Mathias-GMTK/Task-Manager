import { useState } from 'react';
import './App.css';
import MyButton from './componentes/MyButton';
 
function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
 
  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };
 
  const completedCount = tasks.filter(t => t.completed).length;
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* CABEÇALHO */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-900 mb-2">
            📝 Task Manager
          </h1>
          <p className="text-gray-600">Organize suas tarefas de forma simples</p>
        </div>
 
        {/* FORMULÁRIO */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-indigo-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              placeholder="O que você precisa fazer?"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && input.trim() !== '') {
                  handleAddTask();
                }
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <MyButton 
              onClick={handleAddTask}
              disabled={input.trim() === ''}
            >
              ➕ Adicionar
            </MyButton>
          </div>
        </div>
 
        {/* ESTATÍSTICAS */}
        {tasks.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-gray-600">Total de tarefas</p>
              <p className="text-2xl font-bold text-indigo-900">{tasks.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600">Concluídas</p>
              <p className="text-2xl font-bold text-green-900">{completedCount}</p>
            </div>
          </div>
        )}
 
        {/* LISTA DE TAREFAS */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Minhas Tarefas
          </h2>
 
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-5xl mb-2">📭</p>
              <p className="text-gray-500 text-lg">Nenhuma tarefa por enquanto</p>
              <p className="text-gray-400 text-sm mt-1">Adicione uma acima para começar!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between gap-4 p-4 rounded-lg border-2 transition-all ${
                    task.completed
                      ? 'bg-green-50 border-green-300 line-through text-gray-500'
                      : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-indigo-50 hover:border-indigo-200'
                  }`}
                >
                  <span className="text-base flex-1 font-medium">{task.text}</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <MyButton
                      onClick={() => {
                        setTasks(
                          tasks.map((t) =>
                            t.id === task.id
                              ? { ...t, completed: !t.completed }
                              : t
                          )
                        );
                      }}
                    >
                      {task.completed ? '↩️ Desfazer' : '✅ Concluir'}
                    </MyButton>
                    <MyButton
                      onClick={() => {
                        setTasks(tasks.filter((t) => t.id !== task.id));
                      }}
                    >
                      🗑️ Deletar
                    </MyButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
 
        {/* RODAPÉ */}
        {tasks.length > 0 && (
          <div className="text-center mt-6 text-sm text-gray-500">
            {completedCount === tasks.length ? (
              <p>🎉 Parabéns! Você concluiu todas as tarefas!</p>
            ) : (
              <p>Faltam {tasks.length - completedCount} tarefa(s) para completar</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
 
export default App;
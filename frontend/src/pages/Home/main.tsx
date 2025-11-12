import { useNavigate } from 'react-router-dom';

/**
 * @page HomePage
 * @summary Home page with welcome message and navigation to create records
 * @domain core
 * @type page-component
 * @category public
 */
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao DataFlow</h2>
      <p className="text-lg text-gray-600 mb-8">
        Sistema simples e intuitivo para gerenciamento de registros
      </p>

      <div className="mb-8">
        <button
          onClick={() => navigate('/records/create')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          + Criar Novo Registro
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Funcionalidades</h3>
        <ul className="text-left space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Criação de registros com formulários intuitivos</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Visualização com filtros e ordenação</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Edição e atualização de informações</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Exclusão segura com confirmação</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Interface intuitiva e fácil de usar</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;

import { useNavigate } from 'react-router-dom';
import { RecordForm } from '@/domain/record/components/RecordForm';
import type { RecordCreatePageProps } from './types';

/**
 * @page RecordCreatePage
 * @summary Page for creating new records with form validation
 * @domain record
 * @type form-page
 * @category management
 *
 * @routing
 * - Path: /records/create
 * - Params: none
 * - Query: none
 * - Guards: None (public access)
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Form
 * - Navigation: Back button
 *
 * @data
 * - Sources: Record API
 * - Loading: Form submission state
 * - Caching: No caching needed
 *
 * @userFlows
 * - Primary: Fill form and submit to create record
 * - Secondary: Cancel and return to home
 * - Error: Display validation errors inline
 */
export const RecordCreatePage = (props: RecordCreatePageProps) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4"
        >
          <span>←</span>
          <span>Voltar</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Criar Novo Registro</h1>
        <p className="text-gray-600 mt-2">
          Preencha as informações abaixo para criar um novo registro no sistema.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <RecordForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Regras de Validação:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• O título deve ter entre 3 e 100 caracteres</li>
          <li>• O título não pode conter apenas caracteres especiais</li>
          <li>• Todos os campos marcados com * são obrigatórios</li>
        </ul>
      </div>
    </div>
  );
};

export default RecordCreatePage;

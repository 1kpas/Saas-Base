import os

def copy_files_content(output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for dirpath, dirnames, filenames in os.walk(os.getcwd(), topdown=True):
            # Ignorar as pastas node_modules, .next, .git e logs
            dirnames[:] = [d for d in dirnames if d not in ['node_modules', '.next', '.git', 'logs', 'ui']]

            for filename in filenames:
                # Ignorar os arquivos package-lock.json e backup.txt
                if filename in ('package-lock.json', 'backup.txt'):
                    continue

                file_path = os.path.join(dirpath, filename)
                try:
                    # Tentativa de ler o arquivo como texto
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                        outfile.write(f'--- Arquivo: {file_path} ---\n')
                        outfile.write(content + '\n')
                        outfile.write('\n' + '=' * 40 + '\n\n')  # Adiciona espaçamento entre arquivos
                except UnicodeDecodeError:
                    # Se o arquivo não for de texto, tratar como binário e pular
                    print(f'O arquivo {file_path} parece ser binário e foi pulado.')
                except Exception as e:
                    # Outras exceções (como permissões)
                    print(f'Não foi possível ler o arquivo {file_path}: {e}')

if __name__ == '__main__':
    output_txt = 'mapeamento.txt'  # Nome do arquivo de saída
    copy_files_content(output_txt)

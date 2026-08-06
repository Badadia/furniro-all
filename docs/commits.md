## Fluxo de trabalho (PT-BR)

1. Arraste o card no Trello para a coluna "Em Progresso" (ou similar).

2. Atualize sua branch `developer` local com as últimas mudanças:

```bash
git switch developer
git pull origin developer
```

3. Crie uma branch específica para a feature/fix/refactor seguindo o padrão:

```
<tipo>/<issue-number>-<descrição-curta>

exemplos:
feat/51-configure-react-router
fix/23-cart-quantity-bug
refactor/12-product-service
```

Crie e troque para a branch:

```bash
git switch -c feat/51-configure-react-router
```

4. Desenvolva a feature localmente. Faça commits atômicos e claros.

5. Mensagens de commit semântico (recomendado):

Formato: `#<issue> <tipo>: descrição curta`

- `<tipo>` pode ser `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, etc.
- Exemplo: `#51 feat: configure React Router`

Fazer commit:

```bash
git add .
git commit -m "#51 feat: configure React Router"
```

6. Suba a branch para o repositório remoto:

```bash
git push -u origin feat/51-configure-react-router
```

7. Abra um Pull Request (PR) no GitHub com título e descrição claros. Referencie o card do Trello e a issue (se houver). Peça revisões a pelo menos um colega.

8. Após aprovação e testes, faça o merge do PR na branch `developer` (siga a estratégia de merge combinada do time — squash/merge ou merge commit conforme o padrão do projeto).

9.  Finalmente, mova o card do Trello para "Concluído".
    
10. Quando todas as features planejadas para o ciclo estiverem integradas e testadas em `developer`, crie um PR de `developer` → `main` e realize o merge para liberar a versão.

---

## Workflow (English)

1. Move the Trello card to the "In Progress" column.

2. Update your local `developer` branch:

```bash
git switch developer
git pull origin developer
```

3. Create a feature/fix/refactor branch using the pattern:

```
<type>/<issue-number>-<short-description>

examples:
feat/51-configure-react-router
fix/23-cart-quantity-bug
refactor/12-product-service
```

Create and switch to the branch:

```bash
git switch -c feat/51-configure-react-router
```

4. Develop the feature. Keep commits small and focused.

5. Semantic commit messages (recommended):

Format: `#<issue> <type>: short description`

- `<type>` can be `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, etc.
- Example: `#51 feat: configure React Router`

Commit example:

```bash
git add .
git commit -m "#51 feat: configure React Router"
```

6. Push the branch to remote:

```bash
git push -u origin feat/51-configure-react-router
```

7. Open a Pull Request with a clear title and description. Reference the Trello card and any issue. Request reviews.

8. After approvals and CI checks, merge the PR into `developer` (use the project's merge strategy: squash or merge commit).

9. Move the Trello card to "Done".

10. After the development cycle, open a PR from `developer` into `main` and merge to release.

---

## Convenções rápidas

- Branch: `<tipo>/<id>-<descrição-curta>` (e.g. `feat/51-improve-search`).
- Commit: `#<id> <tipo>: descrição` (e.g. `#51 fix: handle null image`).
- PR: título claro, vincule Trello/issue, descreva mudanças e passos para testar.

## Checklist antes do PR

- Código compilando sem erros
- Testes relevantes passando (se aplicável)
- Atualizar documentação se necessário
- Garantir nomes e mensagens semânticas

---


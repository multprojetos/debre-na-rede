-- =============================================
-- DEBRE NA REDE — Schema Inicial
-- Execute no SQL Editor do Supabase:
-- https://supabase.com/dashboard/project/cizkzblacwoislgxzdhr/sql
-- =============================================

-- ENUMS (sintaxe correta para PostgreSQL)
DO $$ BEGIN CREATE TYPE categoria AS ENUM ('Aberto', 'Master'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE posicao AS ENUM ('GL', 'ZG', 'LD', 'LE', 'VOL', 'MC', 'ALE', 'ALD', 'CA'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE user_role AS ENUM ('admin', 'torcedor'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE manto_tipo AS ENUM ('Jogo', 'Treino', 'Especial'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE parceiro_cat AS ENUM ('Saúde', 'Supermercado', 'Automotivo', 'Alimentação', 'Serviços', 'Outros'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =============================================
-- PROFILES (extensão do auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'torcedor',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PARTIDAS
-- =============================================
CREATE TABLE IF NOT EXISTS partidas (
    id BIGSERIAL PRIMARY KEY,
    adversario TEXT NOT NULL,
    adversario_iniciais TEXT NOT NULL,
    data_hora TIMESTAMPTZ NOT NULL,
    local TEXT NOT NULL,
    categoria categoria NOT NULL DEFAULT 'Aberto',
    gols_debre INTEGER DEFAULT 0,
    gols_adversario INTEGER DEFAULT 0,
    is_finalizada BOOLEAN DEFAULT false,
    campeonato TEXT DEFAULT 'Campeonato Municipal',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- JOGADORES (Elenco)
-- =============================================
CREATE TABLE IF NOT EXISTS jogadores (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    number INTEGER NOT NULL,
    pos posicao NOT NULL,
    categoria categoria NOT NULL,
    gols INTEGER DEFAULT 0,
    jogos INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    initials TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- GOLS (eventos por partida)
-- =============================================
CREATE TABLE IF NOT EXISTS gols (
    id BIGSERIAL PRIMARY KEY,
    partida_id BIGINT REFERENCES partidas(id) ON DELETE CASCADE,
    jogador_id BIGINT REFERENCES jogadores(id) ON DELETE SET NULL,
    jogador_nome TEXT NOT NULL,
    minuto TEXT,
    descricao TEXT,
    emoji TEXT DEFAULT '⚽',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STATS DO TIME (por temporada e categoria)
-- =============================================
CREATE TABLE IF NOT EXISTS team_stats (
    id BIGSERIAL PRIMARY KEY,
    temporada TEXT NOT NULL,
    categoria categoria NOT NULL,
    jogos INTEGER DEFAULT 0,
    vitorias INTEGER DEFAULT 0,
    empates INTEGER DEFAULT 0,
    derrotas INTEGER DEFAULT 0,
    gols_pro INTEGER DEFAULT 0,
    gols_contra INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(temporada, categoria)
);

-- =============================================
-- TABELA DE CLASSIFICAÇÃO
-- =============================================
CREATE TABLE IF NOT EXISTS classificacao (
    id BIGSERIAL PRIMARY KEY,
    temporada TEXT NOT NULL,
    categoria categoria NOT NULL,
    posicao INTEGER NOT NULL,
    nome_time TEXT NOT NULL,
    pontos INTEGER DEFAULT 0,
    jogos INTEGER DEFAULT 0,
    vitorias INTEGER DEFAULT 0,
    empates INTEGER DEFAULT 0,
    derrotas INTEGER DEFAULT 0,
    saldo_gols TEXT DEFAULT '0',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- NOTÍCIAS
-- =============================================
CREATE TABLE IF NOT EXISTS noticias (
    id BIGSERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    conteudo TEXT,
    categoria TEXT NOT NULL DEFAULT 'Notícias',
    is_hot BOOLEAN DEFAULT false,
    thumb_emoji TEXT DEFAULT '📰',
    image_url TEXT,
    autor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RESENHA (comentários pós-jogo)
-- =============================================
CREATE TABLE IF NOT EXISTS resenha (
    id BIGSERIAL PRIMARY KEY,
    partida_id BIGINT REFERENCES partidas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    texto TEXT NOT NULL,
    tipo TEXT DEFAULT 'texto',
    audio_url TEXT,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resenha_likes (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    comentario_id BIGINT REFERENCES resenha(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, comentario_id)
);

-- =============================================
-- VOTOS DO TORCEDOR
-- =============================================
CREATE TABLE IF NOT EXISTS votos_craque (
    id BIGSERIAL PRIMARY KEY,
    partida_id BIGINT REFERENCES partidas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    jogador_id BIGINT REFERENCES jogadores(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(partida_id, user_id)
);

CREATE TABLE IF NOT EXISTS votos_gol_bonito (
    id BIGSERIAL PRIMARY KEY,
    partida_id BIGINT REFERENCES partidas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    gol_id BIGINT REFERENCES gols(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(partida_id, user_id)
);

-- =============================================
-- MANTOS (uniformes histórico)
-- =============================================
CREATE TABLE IF NOT EXISTS mantos (
    id BIGSERIAL PRIMARY KEY,
    ano TEXT NOT NULL,
    tipo manto_tipo NOT NULL DEFAULT 'Jogo',
    cor TEXT NOT NULL,
    cor_nome TEXT NOT NULL,
    preco DECIMAL(8,2),
    preco_original DECIMAL(8,2),
    is_new BOOLEAN DEFAULT false,
    esgotado BOOLEAN DEFAULT false,
    descricao TEXT,
    emoji TEXT DEFAULT '👕',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PARCEIROS (patrocinadores)
-- =============================================
CREATE TABLE IF NOT EXISTS parceiros (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    categoria parceiro_cat NOT NULL,
    emoji TEXT DEFAULT '🤝',
    descricao TEXT NOT NULL,
    endereco TEXT,
    telefone TEXT,
    whatsapp TEXT,
    cor TEXT DEFAULT '#C9A227',
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- GALERIA
-- =============================================
CREATE TABLE IF NOT EXISTS galeria (
    id BIGSERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    image_url TEXT NOT NULL,
    categoria TEXT DEFAULT 'Geral',
    partida_id BIGINT REFERENCES partidas(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- HISTÓRIA DO CLUBE (timeline)
-- =============================================
CREATE TABLE IF NOT EXISTS historia (
    id BIGSERIAL PRIMARY KEY,
    ano TEXT NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    emoji TEXT DEFAULT '📅',
    is_featured BOOLEAN DEFAULT false,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- VIEWS
-- =============================================
CREATE OR REPLACE VIEW artilharia AS
SELECT
    j.id,
    j.name,
    j.number,
    j.categoria,
    j.gols,
    j.initials,
    RANK() OVER (PARTITION BY j.categoria ORDER BY j.gols DESC) AS rank
FROM jogadores j
WHERE j.is_active = true AND j.gols > 0;

CREATE OR REPLACE VIEW assistencias_view AS
SELECT
    j.id,
    j.name,
    j.number,
    j.categoria,
    j.assists,
    j.initials,
    RANK() OVER (PARTITION BY j.categoria ORDER BY j.assists DESC) AS rank
FROM jogadores j
WHERE j.is_active = true AND j.assists > 0;

-- =============================================
-- FUNÇÕES
-- =============================================

-- Criar profile automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        'torcedor'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Contagem de votos craque por partida
CREATE OR REPLACE FUNCTION votos_craque_count(p_partida_id BIGINT)
RETURNS TABLE(jogador_id BIGINT, total BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT vc.jogador_id, COUNT(*) AS total
    FROM votos_craque vc
    WHERE vc.partida_id = p_partida_id
    GROUP BY vc.jogador_id;
END;
$$ LANGUAGE plpgsql;

-- Contagem de votos gol bonito por partida
CREATE OR REPLACE FUNCTION votos_gol_count(p_partida_id BIGINT)
RETURNS TABLE(gol_id BIGINT, total BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT vg.gol_id, COUNT(*) AS total
    FROM votos_gol_bonito vg
    WHERE vg.partida_id = p_partida_id
    GROUP BY vg.gol_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select_all" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Partidas
ALTER TABLE partidas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "partidas_select_all" ON partidas;
DROP POLICY IF EXISTS "partidas_admin_write" ON partidas;
CREATE POLICY "partidas_select_all" ON partidas FOR SELECT USING (true);
CREATE POLICY "partidas_admin_write" ON partidas FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Jogadores
ALTER TABLE jogadores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "jogadores_select_all" ON jogadores;
DROP POLICY IF EXISTS "jogadores_admin_write" ON jogadores;
CREATE POLICY "jogadores_select_all" ON jogadores FOR SELECT USING (true);
CREATE POLICY "jogadores_admin_write" ON jogadores FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Gols
ALTER TABLE gols ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gols_select_all" ON gols;
DROP POLICY IF EXISTS "gols_admin_write" ON gols;
CREATE POLICY "gols_select_all" ON gols FOR SELECT USING (true);
CREATE POLICY "gols_admin_write" ON gols FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Team stats
ALTER TABLE team_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "team_stats_select_all" ON team_stats;
DROP POLICY IF EXISTS "team_stats_admin_write" ON team_stats;
CREATE POLICY "team_stats_select_all" ON team_stats FOR SELECT USING (true);
CREATE POLICY "team_stats_admin_write" ON team_stats FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Classificacao
ALTER TABLE classificacao ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "classificacao_select_all" ON classificacao;
DROP POLICY IF EXISTS "classificacao_admin_write" ON classificacao;
CREATE POLICY "classificacao_select_all" ON classificacao FOR SELECT USING (true);
CREATE POLICY "classificacao_admin_write" ON classificacao FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Noticias
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "noticias_select_all" ON noticias;
DROP POLICY IF EXISTS "noticias_admin_write" ON noticias;
CREATE POLICY "noticias_select_all" ON noticias FOR SELECT USING (true);
CREATE POLICY "noticias_admin_write" ON noticias FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Resenha
ALTER TABLE resenha ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "resenha_select_all" ON resenha;
DROP POLICY IF EXISTS "resenha_insert_auth" ON resenha;
DROP POLICY IF EXISTS "resenha_update_admin" ON resenha;
DROP POLICY IF EXISTS "resenha_delete_own" ON resenha;
CREATE POLICY "resenha_select_all" ON resenha FOR SELECT USING (true);
CREATE POLICY "resenha_insert_auth" ON resenha FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "resenha_update_admin" ON resenha FOR UPDATE
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "resenha_delete_own" ON resenha FOR DELETE USING (auth.uid() = user_id);

-- Resenha likes
ALTER TABLE resenha_likes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "resenha_likes_select_all" ON resenha_likes;
DROP POLICY IF EXISTS "resenha_likes_auth" ON resenha_likes;
CREATE POLICY "resenha_likes_select_all" ON resenha_likes FOR SELECT USING (true);
CREATE POLICY "resenha_likes_auth" ON resenha_likes FOR ALL USING (auth.uid() = user_id);

-- Votos craque
ALTER TABLE votos_craque ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "votos_craque_select_all" ON votos_craque;
DROP POLICY IF EXISTS "votos_craque_insert_auth" ON votos_craque;
CREATE POLICY "votos_craque_select_all" ON votos_craque FOR SELECT USING (true);
CREATE POLICY "votos_craque_insert_auth" ON votos_craque FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Votos gol
ALTER TABLE votos_gol_bonito ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "votos_gol_select_all" ON votos_gol_bonito;
DROP POLICY IF EXISTS "votos_gol_insert_auth" ON votos_gol_bonito;
CREATE POLICY "votos_gol_select_all" ON votos_gol_bonito FOR SELECT USING (true);
CREATE POLICY "votos_gol_insert_auth" ON votos_gol_bonito FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Mantos
ALTER TABLE mantos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "mantos_select_all" ON mantos;
DROP POLICY IF EXISTS "mantos_admin_write" ON mantos;
CREATE POLICY "mantos_select_all" ON mantos FOR SELECT USING (true);
CREATE POLICY "mantos_admin_write" ON mantos FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Parceiros
ALTER TABLE parceiros ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "parceiros_select_all" ON parceiros;
DROP POLICY IF EXISTS "parceiros_admin_write" ON parceiros;
CREATE POLICY "parceiros_select_all" ON parceiros FOR SELECT USING (true);
CREATE POLICY "parceiros_admin_write" ON parceiros FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Galeria
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "galeria_select_all" ON galeria;
DROP POLICY IF EXISTS "galeria_admin_write" ON galeria;
CREATE POLICY "galeria_select_all" ON galeria FOR SELECT USING (true);
CREATE POLICY "galeria_admin_write" ON galeria FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Historia
ALTER TABLE historia ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "historia_select_all" ON historia;
DROP POLICY IF EXISTS "historia_admin_write" ON historia;
CREATE POLICY "historia_select_all" ON historia FOR SELECT USING (true);
CREATE POLICY "historia_admin_write" ON historia FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- =============================================
-- DADOS INICIAIS (Seed)
-- =============================================

-- Próxima partida (não finalizada)
INSERT INTO partidas (adversario, adversario_iniciais, data_hora, local, categoria, campeonato)
VALUES ('Vila Nova FC', 'VN', NOW() + INTERVAL '3 days', 'Campo do Debrê', 'Aberto', 'Campeonato Municipal')
ON CONFLICT DO NOTHING;

-- Última partida finalizada (para votos e resenha)
INSERT INTO partidas (adversario, adversario_iniciais, data_hora, local, categoria, gols_debre, gols_adversario, is_finalizada, campeonato)
VALUES ('Vila Nova FC', 'VN', NOW() - INTERVAL '1 day', 'Campo do Debrê', 'Aberto', 4, 1, true, 'Campeonato Municipal')
ON CONFLICT DO NOTHING;

-- Jogadores Aberto
INSERT INTO jogadores (name, number, pos, categoria, gols, jogos, assists, initials, is_active) VALUES
('Duda', 1, 'GL', 'Aberto', 0, 12, 0, 'DU', true),
('Paulo Henrique', 4, 'ZG', 'Aberto', 1, 11, 0, 'PH', true),
('Renan', 5, 'ZG', 'Aberto', 2, 10, 1, 'RE', true),
('Carlinhos', 2, 'LD', 'Aberto', 0, 12, 3, 'CA', true),
('André Silva', 6, 'LE', 'Aberto', 1, 9, 4, 'AS', true),
('Thiaguinho', 8, 'VOL', 'Aberto', 3, 12, 5, 'TH', true),
('Marquinhos', 10, 'MC', 'Aberto', 8, 11, 6, 'MQ', true),
('Felipe', 7, 'ALD', 'Aberto', 4, 10, 3, 'FE', true),
('Bruno', 11, 'ALE', 'Aberto', 5, 12, 2, 'BR', true),
('Rafael', 9, 'CA', 'Aberto', 7, 12, 4, 'RA', true),
('Caio', 17, 'CA', 'Aberto', 6, 11, 1, 'CI', true);

-- Jogadores Master
INSERT INTO jogadores (name, number, pos, categoria, gols, jogos, assists, initials, is_active) VALUES
('Zé Carlos', 1, 'GL', 'Master', 0, 8, 0, 'ZC', true),
('Paulão', 4, 'ZG', 'Master', 1, 8, 0, 'PO', true),
('Márcio', 5, 'ZG', 'Master', 0, 7, 1, 'MA', true),
('Beto', 8, 'VOL', 'Master', 2, 8, 3, 'BE', true),
('Juninho', 10, 'MC', 'Master', 4, 8, 5, 'JU', true),
('Serginho', 9, 'CA', 'Master', 5, 8, 2, 'SE', true),
('Neném', 11, 'CA', 'Master', 3, 7, 1, 'NN', true);

-- Team stats
INSERT INTO team_stats (temporada, categoria, jogos, vitorias, empates, derrotas, gols_pro, gols_contra) VALUES
('2026', 'Aberto', 12, 9, 2, 1, 38, 12),
('2026', 'Master', 8, 5, 2, 1, 22, 9)
ON CONFLICT (temporada, categoria) DO NOTHING;

-- Classificação
INSERT INTO classificacao (temporada, categoria, posicao, nome_time, pontos, jogos, vitorias, empates, derrotas, saldo_gols) VALUES
('2026', 'Aberto', 1, 'Debreceni FC', 29, 12, 9, 2, 1, '+26'),
('2026', 'Aberto', 2, 'Vila Nova FC', 22, 12, 7, 1, 4, '+14'),
('2026', 'Aberto', 3, 'São Pedro FC', 19, 12, 6, 1, 5, '+8'),
('2026', 'Aberto', 4, 'Carmo Atlético', 14, 12, 4, 2, 6, '-4'),
('2026', 'Master', 1, 'Debreceni FC', 17, 8, 5, 2, 1, '+13'),
('2026', 'Master', 2, 'Veteranos FC', 13, 8, 4, 1, 3, '+7');

-- Notícias iniciais
INSERT INTO noticias (titulo, descricao, conteudo, categoria, is_hot, thumb_emoji) VALUES
('Debrê goleia por 4 a 1 e assume liderança do campeonato municipal',
 'Com dois gols de Marquinhos e atuação impecável do goleiro Duda, o Debreceni FC venceu com autoridade.',
 'Em partida disputada no Campo do Debrê neste domingo, o Debreceni FC goleou o Vila Nova FC por 4 a 1 e manteve a liderança do Campeonato Municipal de Carmo-RJ. Marquinhos marcou dois gols, Caio fez um golaço de calcanhar e Rafael completou o placar. O goleiro Duda foi destaque com três defesas difíceis no segundo tempo.',
 'Notícias', true, '⚽'),
('Convocados para a próxima rodada – categoria Aberto e Master',
 'Confira a lista completa dos jogadores confirmados para o jogo de domingo.',
 'O técnico convocou o seguinte grupo para o jogo de domingo no Campo do Debrê. Todos os titulares estão disponíveis. Treino marcado para sábado às 9h.',
 'Elenco', false, '📋'),
('Novo manto é revelado! Vem ver o uniforme novo, mermão!',
 'O novo uniforme chega com traços do escudo histórico do clube e cores que representam Carmo-RJ.',
 'O novo uniforme do Debreceni FC para a temporada 2026 chegou! Azul marinho profundo com detalhes dourados, escudo bordado e tecido premium. Pré-vendas abertas pelo app!',
 'Manto', false, '👕'),
('Rodada passada: Debrê 2 x 0 São Pedro FC – Cê viu o pé?',
 'Bela vitória do Debrê com dois gols ainda no primeiro tempo e defesa sólida após o intervalo.',
 NULL, 'Resultados', false, '🏆'),
('Programação completa da semana – não perde, hein!',
 'Treinos, jogos e eventos do clube para a semana. Cola no campo!',
 NULL, 'Agenda', false, '📅'),
('Debrê confirma parceria com Farmácia Central de Carmo',
 'Nova parceria trará benefícios exclusivos para os torcedores do Debreceni FC.',
 NULL, 'Notícias', false, '📰');

-- Mantos
INSERT INTO mantos (ano, tipo, cor, cor_nome, preco, preco_original, is_new, esgotado, descricao, emoji) VALUES
('2026', 'Jogo', '#0D1B3E', 'Azul Marinho', 89.90, 110.00, true, false, 'Azul marinho profundo com detalhes dourados. Escudo bordado e tecido premium.', '🔵'),
('2025', 'Jogo', '#0D1B3E', 'Azul Marinho', 79.90, NULL, false, false, 'Uniforme da temporada 2025.', '🔵'),
('2025', 'Treino', '#F5EDD6', 'Creme', 69.90, NULL, false, false, 'Manto de treino temporada 2025.', '⚪'),
('2024', 'Jogo', '#0D1B3E', 'Azul Marinho', 59.90, NULL, false, true, 'Uniforme da temporada 2024.', '🔵'),
('2024', 'Especial', '#C9A227', 'Dourado', NULL, NULL, false, true, 'Edição especial comemorativa.', '🟡'),
('2023', 'Jogo', '#0D1B3E', 'Azul Marinho', NULL, NULL, false, true, 'Uniforme da temporada 2023.', '🔵');

-- Parceiros
INSERT INTO parceiros (name, categoria, emoji, descricao, endereco, telefone, cor, is_active) VALUES
('Farmácia Central', 'Saúde', '💊', '10% de desconto para torcedores do Debrê na compra de medicamentos.', 'Rua das Flores, 123 - Centro, Carmo-RJ', '(24) 2451-0001', '#27AE60', true),
('Mercadão Carmo', 'Supermercado', '🛒', 'Promoções especiais todo sábado de jogo do Debrê. Apresente seu manto!', 'Av. Principal, 456 - Centro, Carmo-RJ', '(24) 2451-0002', '#E87A40', true),
('Auto Peças Silva', 'Automotivo', '🔧', 'Peças e serviços com 8% de desconto para torcedores cadastrados.', 'Rua do Comércio, 789 - Vila Nova, Carmo-RJ', '(24) 2451-0003', '#2980B9', true),
('Sorveteria Gelé', 'Alimentação', '🍦', 'Sorvete na vitória! 2 bolas pelo preço de 1 no dia seguinte a cada vitória do Debrê.', 'Praça Central, s/n - Centro, Carmo-RJ', '(24) 2451-0004', '#9B59B6', true),
('Gráfica do Torcedor', 'Serviços', '🖨️', 'Impressão de camisas, banners e materiais esportivos com preços diferenciados.', 'Rua XV de Novembro, 321 - Centro, Carmo-RJ', '(24) 2451-0005', '#C9A227', true);

-- Historia
INSERT INTO historia (ano, titulo, descricao, emoji, is_featured, ordem) VALUES
('2009', 'A Fundação', 'O Debreceni FC nasceu de uma pelada entre amigos no bairro de Carmo. Seis jogadores, uma bola murcha e muita paixão pelo futebol.', '⚽', true, 1),
('2011', 'Primeiro Campeonato', 'Dois anos depois, o Debrê disputou e venceu seu primeiro campeonato municipal de futebol amador. Festa na cidade!', '🏆', false, 2),
('2014', 'O Manto Dourado', 'Foi lançado o famoso uniforme dourado comemorativo, que até hoje é o mais querido pelos torcedores.', '👕', false, 3),
('2018', 'Categoria Master', 'O clube criou a categoria Master para que os veteranos pudessem continuar jogando e representando o Debrê.', '🏅', false, 4),
('2022', 'Campo Próprio', 'Após anos jogando em campos emprestados, o Debrê conseguiu seu próprio espaço de treinamento em Carmo-RJ.', '🏟️', true, 5),
('2026', 'Era Digital', 'O clube lançou o app Debrê na Rede para conectar torcedores, jogadores e parceiros de onde estiverem!', '📱', true, 6);

-- Gols da última partida (id=2 - finalizada)
INSERT INTO gols (partida_id, jogador_nome, minuto, descricao, emoji) VALUES
(2, 'Marquinhos', '12''', 'Cobrança de falta no ângulo esquerdo', '🎯'),
(2, 'Caio', '67''', 'Gol de calcanhar após levantamento na área', '🦋'),
(2, 'Rafael', '78''', 'Cabeçada no canto direito após escanteio', '💪'),
(2, 'Marquinhos', '85''', 'Pressão na saída e chute colocado', '⚽');

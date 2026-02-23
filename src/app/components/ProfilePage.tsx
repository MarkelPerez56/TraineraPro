import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme, type AppTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Camera, Save, Loader2, User, Mail, AtSign, FileText, Palette, Check } from 'lucide-react';
import { toast } from 'sonner';

const THEMES: { value: AppTheme; label: string; description: string; preview: { bg: string; accent: string } }[] = [
  {
    value: 'default',
    label: 'Clasico',
    description: 'Blanco con botones negro',
    preview: { bg: '#ffffff', accent: '#030213' },
  },
  {
    value: 'pink',
    label: 'Rosa',
    description: 'Blanco con botones rosa',
    preview: { bg: '#ffffff', accent: '#e11d73' },
  },
];

export function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [username, setUsername] = useState(profile?.username ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Sync form fields when profile loads or changes
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '');
      setUsername(profile.username ?? '');
      setBio(profile.bio ?? '');
    }
  }, [profile]);

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploadingAvatar(true);

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('user-files')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Error al subir la imagen');
      setIsUploadingAvatar(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('user-files')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (updateError) {
      toast.error('Error al actualizar el avatar');
    } else {
      toast.success('Avatar actualizado');
      await refreshProfile();
    }

    setIsUploadingAvatar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        username,
        bio,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error al guardar perfil:', error);
      toast.error('Error al actualizar el perfil', {
        description: error.message,
      });
    } else {
      toast.success('Perfil actualizado correctamente');
      await refreshProfile();
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1>Mi Perfil</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona tu informacion personal
        </p>
      </div>

      {/* Avatar Card */}
      <Card>
        <CardHeader>
          <CardTitle>Foto de perfil</CardTitle>
          <CardDescription>Sube una imagen para tu avatar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-secondary" style={{ fontSize: '1.5rem' }}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {isUploadingAvatar ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-white" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
            <div>
              <p>{profile?.full_name || 'Sin nombre'}</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                {user?.email}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
              >
                <Camera className="w-4 h-4 mr-2" />
                Cambiar foto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informacion personal</CardTitle>
          <CardDescription>Actualiza tu nombre, usuario y biografia</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="fullname"
                  placeholder="Tu nombre completo"
                  className="pl-10"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="usuario123"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electronico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={user?.email ?? ''}
                  disabled
                />
              </div>
              <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                El correo no se puede cambiar desde aqui
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="bio"
                  placeholder="Cuentanos sobre ti..."
                  className="pl-10 min-h-[100px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={500}
                />
              </div>
              <p className="text-muted-foreground text-right" style={{ fontSize: '0.75rem' }}>
                {bio.length}/500
              </p>
            </div>

            <Separator />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Theme Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>Selecciona un tema para la aplicacion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {THEMES.map((t) => {
              const isActive = theme === t.value;
              return (
                <div
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isActive
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  {/* Mini preview */}
                  <div
                    className="w-14 h-10 rounded-md border border-border/50 flex items-center justify-center gap-1.5 shrink-0"
                    style={{ backgroundColor: t.preview.bg }}
                  >
                    <div
                      className="w-7 h-3 rounded-sm"
                      style={{ backgroundColor: t.preview.accent }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.label}</p>
                    <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                      {t.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
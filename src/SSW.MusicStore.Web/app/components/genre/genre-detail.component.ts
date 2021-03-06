import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Album} from '../../models';
import {GenreService} from '../../services/genre/genre.service';
import {AlbumSummary} from '../album/album-summary.component';

@Component({
  selector: 'genre-detail',
  templateUrl: 'app/components/genre/genre-detail.component.html',
  styleUrls: ['app/components/genre/genre-detail.component.css'],
  inputs: ['genre']
})
export class GenreDetailComponent implements OnInit {
  albums: Album[];
  subscription: any;

  constructor(private _genreService: GenreService,
      private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
      if (!this.albums) {
          this.subscription = this._route
              .params
              .subscribe((params) => {
                  let name = params['name'].toString();
                  this.getGenreAlbums(name);
              });
    }
  }

  getGenreAlbums(name: string) {
    this._genreService.getGenreAlbums(name)
      .subscribe(albums =>
        this.albums = albums
      );
  }

  goToAlbumDetail(album: Album) {
    this._router.navigate([`/album`, album.albumId]);
  }
}
